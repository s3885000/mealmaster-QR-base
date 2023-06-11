import { Body, Controller, ValidationPipe, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.registerUser(createUserDto);
    return { message: 'Registration successful', user };
  }


}
