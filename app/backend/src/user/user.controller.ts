import { Body, Controller, Delete, ValidationPipe, Post, HttpCode, HttpStatus, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entity/user.entity';
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


  @Get(':id/profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUserProfile(id);
  }

  @Put(':id/profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Param('id') id: number, @Body() updateUserData: CreateUserDto | CreateRestaurantOwnerDto): Promise<User> {
    return await this.usersService.updateUserProfile(id, updateUserData);
  }

  @Delete(':id/profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProfile(@Param('id') id: number): Promise<void> {
    return await this.usersService.deleteUserProfile(id);
  }
  


}
