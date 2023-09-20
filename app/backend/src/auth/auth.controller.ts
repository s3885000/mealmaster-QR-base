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
import { phoneNumberValidateDto } from 'src/user/dto/request/phoneNumberValidationDto.dto';
import { UserService } from 'src/user/user.service';
import { emailValidateDto } from 'src/user/dto/request/emailValidationDto.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly anonymousService: AnonymousService,
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
        ) {}

    // Guest Login
    @Post('guest/login')
    async anonymousLogin(@Res({ passthrough: true}) res: Response): Promise<{ accessToken: string, refreshToken: string }> {
        const { accessToken, refreshToken } = await this.anonymousService.generateAnonymousUser();

        //Save the access token as a cookie
        res.cookie('authorization', refreshToken, { httpOnly: true, sameSite: 'strict' })

        return { accessToken, refreshToken };
    }

    // Guest me
    @UseGuards(AnonymousGuard)
    @Get('guest/protected')
    async getAnonymousProtectedRoute(@Request() req): Promise<string> {
        return `Hello, Guest user with ID: ${req.user.guest_id}`;
    }

    //Validate the phone number
    @Post('validate-phone-number')
    @HttpCode(HttpStatus.OK)
    async validatePhoneNumber(@Body(ValidationPipe) phoneNumberValidateDto: phoneNumberValidateDto): Promise<{ valid: boolean }> {
        const user = await this.userService.findUserByPhoneNumber(phoneNumberValidateDto.phone_number);
        return { valid: user !== null };
    }
    
    //Validate email
    @Post('validate-email')
    @HttpCode(HttpStatus.OK)
    async validateEmail(@Body(ValidationPipe) emailValidateDto: emailValidateDto): Promise<{ valid: boolean }> {
        const user = await this.userService.findUserByEmail(emailValidateDto.email);
        return { valid: user !== null };
    }

    // Customer login
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async customerLogin(@Body(ValidationPipe) loginUserDto: CustomerLoginDto, @Res({ passthrough: true}) response: Response): Promise<LoginResponseDto> {
        const { accessToken, refreshToken } = await this.authService.customerLogin(loginUserDto);
        
        response.cookie('authorization', refreshToken, { httpOnly: true, sameSite: 'strict' });
        
        return { accessToken, refreshToken };
    }

    // Restaurant owner login
    @Post('restaurant-owner/login')
    @HttpCode(HttpStatus.OK)
    async ownerLogin(@Body(ValidationPipe) loginUserDto: OwnerLoginDto, @Res({ passthrough: true}) response: Response): Promise<LoginResponseDto> {
        const { accessToken, refreshToken } = await this.authService.ownerLogin(loginUserDto);
        
        response.cookie('authorization', refreshToken, { httpOnly: true, sameSite: 'strict' });
        
        return { accessToken, refreshToken };
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
