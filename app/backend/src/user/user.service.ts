import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entity/user.entity';
import { CreateUserDto } from './dto/user-request/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateRestaurantOwnerDto } from './dto/user-request/create-res-owner.dto';
import { UpdateUserDto } from './dto/user-request/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto | CreateRestaurantOwnerDto, userRole: UserRole): Promise<User> {
    if (userRole === UserRole.CUSTOMER) {
      const { phoneNumber, password } = createUserDto as CreateUserDto;

      const userExists = await this.userRepository.findOne({where: { phoneNumber }});

      if (userExists) {
        throw new ConflictException('Phone number already exists!');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({
        phoneNumber,
        password: hashedPassword,
        role: userRole
      });
      await this.userRepository.save(user);

      return user;
    } else if (userRole === UserRole.RESTAURANT_OWNER) {
      const { email, password } = createUserDto as CreateRestaurantOwnerDto;

      const userExists = await this.userRepository.findOne ({where: { email }});

      if (userExists) {
        throw new ConflictException('Email already exists!');
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({
        email,
        password: hashedPassword,
        role: userRole,
      });
      await this.userRepository.save(user);

      return user;
    } else {
      throw new UnauthorizedException('Invalid user role');
    }
  }

  async findUserById(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: userId }});
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phoneNumber } });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { refreshToken } });
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<User> {
    const parsedUserId = parseInt(userId, 10);
    const user = await this.userRepository.findOne({ where: { id: parsedUserId } });
  
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
  
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
  
    return user;
  }

  async getUserProfile(userId:number): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserProfile(userId:number, updateUserData: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found!');

    if (user.role === UserRole.CUSTOMER && updateUserData.phoneNumber) {
      user.phoneNumber = updateUserData.phoneNumber;
    }

    if (user.role === UserRole.RESTAURANT_OWNER && updateUserData.email) {
      user.email = updateUserData.email;
    }

    if (updateUserData.password) {
      const hashedPassword = await bcrypt.hash(updateUserData.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }

}
