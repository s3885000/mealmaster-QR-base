import { Body, Controller, Get, Query, Post, HttpCode, UseGuards, ValidationPipe, HttpStatus, Req, UnauthorizedException, Res } from '@nestjs/common';
import { AnonymousService } from '../user/anonymous/anonymous.service';
import { AnonymousGuard } from './guards/anonymous.guard';
import { UsersService } from 'src/user/user.service'
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from '../jwt/token/dto/refresh-token.dto';
import { TokenService } from '../jwt/token/token.service';
import { AuthService } from './auth.service';
import { SessionService } from 'src/jwt/session/session.service';
import { Response } from 'express';
import { UserRole } from 'src/user/entity/user.entity';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly anonymousService: AnonymousService,
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
        private readonly sessionService: SessionService,
        ) {}

    @Get('guest-login')
    async anonymousLogin(@Res({ passthrough: true}) res: Response): Promise<{ id: string, token: string }> {
        const id = this.anonymousService.generateRandomId();
        const token = this.anonymousService.generateAccessToken(id);

        //Store the guest session in the database
        this.sessionService.addSession(id, token);

        //Save the access token as a cookie
        res.cookie('access_token', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })

        return { id, token };
    }

    @Get('me')
    @UseGuards(AnonymousGuard)
    async getAuthenticatedUser(
        @Query('id') id: string, 
        @Query('token') token: string
    ): Promise<string> {
        const session = await this.sessionService.findSessionByGuestId(id);
        if (session && session.token === token) {
            return `Hello, Anonymous user with ID: ${id}`;
        }
        return `Invalid or non-anonymous user`;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body(ValidationPipe) loginUserDto: LoginUserDto, @Res({ passthrough: true}) response: Response): Promise<any> {
        loginUserDto.role = UserRole.CUSTOMER;

        const { user, token } = await this.authService.loginUser(loginUserDto);
        const accessToken = this.tokenService.generateAccessToken(user.id.toString());
        const refreshToken = this.tokenService.generateRefreshToken(user.id.toString());

        //Update the refresh token in the database
        await this.usersService.updateRefreshToken(user.id.toString(), refreshToken);

        // Set the refresh token in a HttpOnly cookie
        response.cookie('refresh_token', refreshToken, {  maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

        return { accessToken };
    }

    @Post('restaurant-owner-login')
    @HttpCode(HttpStatus.OK)
    async loginRestaurantOwner(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<any> {
        loginUserDto.role = UserRole.CUSTOMER;

        const { user, token } = await this.authService.loginUser(loginUserDto);
        const accessToken = this.tokenService.generateAccessToken(user.id.toString());
        const refreshToken = this.tokenService.generateRefreshToken(user.id.toString());

        //Update the refresh token in the database
        await this.usersService.updateRefreshToken(user.id.toString(), refreshToken);

        //

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
        const newRefreshToken = this.tokenService.generateRefreshToken(user.id.toString());
        await this.usersService.updateRefreshToken(user.id.toString(), newRefreshToken)

        const accessToken = await this.tokenService.generateAccessToken(user.id.toString());
        return { accessToken, refreshToken: newRefreshToken };
        
    }

    @Post('logout')
    async logout(@Body() body: any, @Req() request: any,@Res() response: Response): Promise<{message: string}> {
        const refreshToken = body.refreshToken;
        const guestId = body.guestId;
        
        if (refreshToken) {
            const decoded = this.jwtService.decode(refreshToken);
            if (!decoded) {
                throw new UnauthorizedException('Invalid refresh token');
            }
            const userId = decoded['sub'];

            // Preform logout logic for register user
            // Invalidate the refresh token for the registered user
            await this.tokenService.invalidateRefreshToken(userId);

        }else if (guestId) {
            // Perform logout logic for guest user
            // Remove the guest session from the database
            await this.sessionService.removeSession(guestId);
        } else {
            throw new UnauthorizedException('No token or guest id provided');
        }

        // Clear the cookie
        response.clearCookie('access_token');

        // Return a successful response
        const result = {message: 'Logout successful!'};
        response.send(result);
        return result;

    }

    @Get('protected-route')
    @UseGuards(AuthGuard)
    protectedRoute (@Req() request): string {
        // Access the authenticated user from the request object
        const user = request.user;
        return `Hello, authenticated user with ID: ${user.id}`;
    }

    @Get('guest-status')
    async guestStatus(@Req() request: any): Promise<{ status: string }> {
        const guestId = request.cookies['access_token'];
        if (guestId) {
            return { status: 'Logged in as guest.' };
        } else {
            return { status: 'Not logged in.' };
        }
    }


}
