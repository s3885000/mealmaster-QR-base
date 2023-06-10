import { Body, Controller, ValidationPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Post('register')
    async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<string> {
        await this.usersService.registerUser(createUserDto);
        return 'Registration successful';
    }

    @Post('login')
    async login(@Body(ValidationPipe) LoginUserDto: LoginUserDto): Promise<{ token: string }> {
        const token = await this.usersService.loginUser(LoginUserDto);
        return {token}
    }
}
