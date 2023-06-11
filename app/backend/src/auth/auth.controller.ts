import { Body, Controller, Get, Query, Post, HttpCode, UseGuards, ValidationPipe, HttpStatus, Req, UnauthorizedException } from '@nestjs/common';
import { AnonymousService } from './anonymous/anonymous.service';
import { AnonymousGuard } from './anonymous/anonymous.guard';
import { UsersService } from 'src/users/users.service'
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from 'src/jwt/dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    //In-memory cache for the guest access tokens
    private readonly guestAccessTokenCache: { [id: string]: string} = {};

    constructor(
        private readonly anonymousService: AnonymousService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        ) {}

    @Get('guest-login')
    anonymousLogin(): { id: string, token: string } {
        const id = this.anonymousService.generateRandomId();
        const token = this.anonymousService.generateAccessToken(id)

        // Store the guest access token in the cache
        this.usersService.addSession(id, token);

        return { id, token };
    }

    @Get('me')
    @UseGuards(AnonymousGuard)
    getAuthenticatedUser(
        @Query('id') id: string, 
        @Query('token') token: string
        ): string {
        try {
            const payload = this.anonymousService.validateToken(token);
            if (payload.id === id && this.anonymousService.isAnonymousUser(id)) {
                return `Hello, Anonymous user with ID: ${id}`;
            }
        } catch (error) {
            return `Invalid or non-anonymous user`;
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<any> {
      const { user, token } = await this.usersService.loginUser(loginUserDto);
      const accessToken = this.generateAccessToken(user.id.toString());
      const refreshToken = this.generateRefreshToken(user.id.toString());

      //Update the refresh token in the database
      await this.usersService.updateRefreshToken(user.id.toString(), refreshToken);

      return { accessToken, refreshToken };
    }

    @Post('refresh-token')
    async refreshAccessToken(@Body(ValidationPipe) refreshTokenDto: RefreshTokenDto): Promise<any> {
        const { refreshToken } = refreshTokenDto;
        const decoded = this.jwtService.decode(refreshToken);
        if (!decoded) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        const userId = decoded['sub'];
        const user = await this.usersService.findUserByRefreshToken(refreshToken);
        if (!user) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        //Generate w new refresh token and update it in the database
        const newRefreshToken = this.generateRefreshToken(user.id.toString());
        await this.usersService.updateRefreshToken(user.id.toString(), newRefreshToken)

        const accessToken = await this.generateAccessToken(user.id.toString());
        return { accessToken, refreshToken: newRefreshToken };
        
    }

    @Post('logout')
    async logout(@Body() refreshTokenDto: RefreshTokenDto, @Req() request: any): Promise<{message: string}> {
        const { refreshToken } = refreshTokenDto;
        const decoded = this.jwtService.decode(refreshToken);
        if (!decoded) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        const userId = decoded ['sub'];

        // Check if the user is a guest or a registered user
        const session = await this.usersService.findSessionByUserId(userId);
        if (session) {
        // Perform logout logic for guest user
        // Remove the guest session from the database
            await this.usersService.removeSession(userId);
        } else {
        // Perform logout logic for registered user
        // Invalidate the refresh token for the registered user
        await this.usersService.invalidateRefreshToken(userId);
    }

    // Return a successful response
    return {message: 'Logout successful!'};
    }

    @Get('protected-route')
    @UseGuards(AuthGuard)
    protectedRoute (@Req() request): string {
        // Access the authenticated user from the request object
        const user = request.user;
        return `Hello, authenticated user with ID: ${user.id}`;
    }

    private generateAccessToken(userId: string): string {
        const payload = { sub: userId };
        return this.jwtService.sign(payload, { expiresIn: '15m' });
    }

    private generateRefreshToken(userId: string): string {
        const payload = { sub: userId };
        return this.jwtService.sign(payload, { expiresIn: '7d'})
    }


}
