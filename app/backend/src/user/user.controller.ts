import { Body, Controller, ValidationPipe, Post, HttpCode, HttpStatus, Get, Param, Put, UseGuards, SetMetadata, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/createUser.dto';
import { User, UserRole } from './entity/user.entity';
import * as createResOwnerDto from './dto/request/createRestaurantOwner.dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RegisterResponseDto } from './dto/response/registerResponse.dto';
import { UpdateUserDto } from './dto/request/updateUser.dto';


@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // Customer Regisration
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<RegisterResponseDto> {
    const user = await this.userService.registerUser(createUserDto, UserRole.CUSTOMER);
    return { message: 'Registration successful', user: user.toResponseObject() };
  }

  // Restaurant Owner Registration
  @Post('restaurant-owner/register')
  @HttpCode(HttpStatus.CREATED)
  async registerRestaurantOwner(@Body(ValidationPipe) createRestaurantOwnerDto: createResOwnerDto.CreateRestaurantOwnerDto): Promise<RegisterResponseDto> {
    const user = await this.userService.registerUser(createRestaurantOwnerDto, UserRole.RESTAURANT_OWNER);
    return { message: 'Restaurant Owner registration successful', user: user.toResponseObject() };
  }

  // Get User Profile
  @Get(':id/profile')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.CUSTOMER, UserRole.RESTAURANT_OWNER])
  @HttpCode(HttpStatus.OK)
  async getProfile(@Param('id') id: number): Promise<User> {
    return await this.userService.getUserProfile(id);
  }

  // Update User Profile
  @Put(':id/profile')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.CUSTOMER, UserRole.RESTAURANT_OWNER])
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserData: UpdateUserDto): Promise<RegisterResponseDto> {
    await this.userService.updateUserProfile(id, updateUserData);
    const user = await this.userService.getUserProfile(id);
    return { message: "User profile updated", user: user.toResponseObject() };
    
  }

}
