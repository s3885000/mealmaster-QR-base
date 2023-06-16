import { Body, Controller, Delete, ValidationPipe, Post, HttpCode, HttpStatus, Get, Param, Put, UseGuards, SetMetadata, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/user-request/create-user.dto';
import { User, UserRole } from './entity/user.entity';
import { CreateRestaurantOwnerDto } from './dto/user-request/create-res-owner.dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RegisterResponseDto } from './dto/user-response/register-res.dto';
import { UpdateUserDto } from './dto/user-request/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<RegisterResponseDto> {
    const user = await this.usersService.registerUser(createUserDto, UserRole.CUSTOMER);
    return { message: 'Registration successful', user: user.toResponseObject() };
  }

  @Post('register-restaurant-owner')
  @HttpCode(HttpStatus.CREATED)
  async registerRestaurantOwner(@Body(ValidationPipe) createRestaurantOwnerDto: CreateRestaurantOwnerDto): Promise<RegisterResponseDto> {
    const user = await this.usersService.registerUser(createRestaurantOwnerDto, UserRole.RESTAURANT_OWNER);
    return { message: 'Restaurant Owner registration successful', user: user.toResponseObject() };
  }


  @Get(':id/profile')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.CUSTOMER, UserRole.RESTAURANT_OWNER])
  @HttpCode(HttpStatus.OK)
  async getProfile(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUserProfile(id);
  }

  @Put(':id/profile')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.CUSTOMER, UserRole.RESTAURANT_OWNER])
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserData: UpdateUserDto): Promise<RegisterResponseDto> {
    await this.usersService.updateUserProfile(id, updateUserData);
    const user = await this.usersService.getUserProfile(id);
    return { message: "User profile updated", user: user.toResponseObject() };
    
  }



}
