import { Body, Controller, ValidationPipe, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './entity/user.entity';
import { CreateRestaurantOwnerDto } from './dto/create-res-owner.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.registerUser(createUserDto, UserRole.CUSTOMER);
    return { message: 'Registration successful', user };
  }

  @Post('register-restaurant-owner')
  @HttpCode(HttpStatus.CREATED)
  async registerRestaurantOwner(@Body(ValidationPipe) createRestaurantOwnerDto: CreateRestaurantOwnerDto): Promise<any> {
    const user = await this.usersService.registerUser(createRestaurantOwnerDto, UserRole.RESTAURANT_OWNER);
    return { message: 'Restaurant Owner registration successful', user};
  }


}
