import { Body, Controller, Get, Post, HttpCode, UseGuards, ValidationPipe, HttpStatus, Req, Res, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AnonymousService } from '../user/anonymous-user/anonymous.service';
import { CustomerLoginDto } from 'src/user/dto/request/customerLogin';
import { AuthGuard } from './guards/auth.guard';
import { TokenService } from '../jwt/token/token.service';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RefreshTokenGuard } from 'src/jwt/token/refreshToken.guard';
import { LoginResponseDto } from 'src/user/dto/response/loginResponse.dto';
import { OwnerLoginDto } from 'src/user/dto/request/ownerLogin.dto';
import { AnonymousGuard } from './guards/anonymous.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly anonymousService: AnonymousService,
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
        ) {}

    // Guest Login
    @Post('guest/login')
    async anonymousLogin(@Res({ passthrough: true}) res: Response): Promise<{ id: string, refreshToken: string }> {
        const user = await this.anonymousService.generateAnonymousUser();
        const refreshToken = this.tokenService.generateRefreshToken(user.guest_id);

        //Save the access token as a cookie
        res.cookie('authorization', refreshToken, { httpOnly: true, sameSite: 'strict' })

        return { id: user.guest_id, refreshToken };
    }

    // Guest me
    @UseGuards(AnonymousGuard)
    @Get('guest/protected')
    async getAnonymousProtectedRoute(@Request() req): Promise<string> {
        return `Hello, Guest user with ID: ${req.user.guest_id}`;
    }
    

    // Customer login
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async customerLogin(@Body(ValidationPipe) loginUserDto: CustomerLoginDto, @Res({ passthrough: true}) response: Response): Promise<LoginResponseDto> {
        const { refreshToken } = await this.authService.customerLogin(loginUserDto);
        
        response.cookie('authorization', refreshToken, { httpOnly: true, sameSite: 'strict' });
        
        return { refreshToken };
    }

    // Restaurant owner login
    @Post('restaurant-owner/login')
    @HttpCode(HttpStatus.OK)
    async ownerLogin(@Body(ValidationPipe) loginUserDto: OwnerLoginDto, @Res({ passthrough: true}) response: Response): Promise<LoginResponseDto> {
        const { refreshToken } = await this.authService.ownerLogin(loginUserDto);
        
        response.cookie('authorization', refreshToken, { httpOnly: true, sameSite: 'strict' });
        
        return { refreshToken };
    }

    // Authenticated protected route
    @UseGuards(AuthGuard)
    @Get('protected')
    async getProtectedRoute(@Request() req): Promise<string> {
        const userName = req.user.first_name ?? req.user.email ?? req.user.phone_number ?? 'Unknown User'
        return `Hello, authenticated user with ID: ${userName}`
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    async refreshToken(@Req() request: ExpressRequest, @Res() res: Response) {
        const refreshToken = request.cookies.refreshToken;
        const { accessToken, refreshToken: newRefreshToken } = await this.tokenService.refreshAccessToken(refreshToken);

        res.cookie ('authorization', newRefreshToken, { httpOnly: true , sameSite: 'strict'});
        res.send({ message: 'Successfully generated tokens', accessToken })
    }

    @Post('logout')
    async logout(@Req() request: ExpressRequest, @Res() response: Response): Promise<{ message: string }> {
        const refreshToken = request.cookies.refreshToken;

        await this.authService.logoutUser(refreshToken);

        // Clear the cookies
        response.clearCookie('authorization');

        // Return a successful response
        const result = { message: 'Logout successful!' };
        response.send(result);
        return result;
    }
    
    

}
