import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entity/user.entity';
import { CreateUserDto } from './dto/request/createUser.dto';
import * as bcrypt from 'bcrypt';
import { CreateRestaurantOwnerDto } from './dto/request/createRestaurantOwner.dto';
import { UpdateUserDto } from './dto/request/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto | CreateRestaurantOwnerDto, userRole: UserRole): Promise<User> {
    if (userRole === UserRole.CUSTOMER) {
      const { phone_number, password } = createUserDto as CreateUserDto;

      const userExists = await this.userRepository.findOne({where: { phone_number }});

      if (userExists) {
        throw new ConflictException('Phone number already exists!');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({
        phone_number,
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

  async findGuestByUserId(guestId: number): Promise<User | undefined> {
    const user = this.userRepository.findOne({ where: { id : guestId, is_guest: true }});
    if (!user) {
      throw new UnauthorizedException('Guest user not found!');
    }
    return user;
  }

  async findUserByPhoneNumber(phone_number: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { phone_number } });
    return user;
  }
  
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserByRefreshToken(refresh_token: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { refresh_token } });
  }

  async updateRefreshToken(userId: string, refresh_token: string): Promise<User> {
    const parsedUserId = parseInt(userId, 10);
    const user = await this.userRepository.findOne({ where: { id: parsedUserId } });
  
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
  
    user.refresh_token = refresh_token;
    await this.userRepository.save(user);
  
    return user;
  }

  async clearRefreshToken(userId: string): Promise<void> {
    const parsedUserId = parseInt(userId, 10); // Conver the userId to a string
    const user = await this.userRepository.findOne({ where: { id: parsedUserId }});
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
    user.refresh_token = null;
    await this.userRepository.save(user);
  }

  async getUserProfile(userId:number): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserProfile(userId:number, updateUserData: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found!');

    if (user.role === UserRole.CUSTOMER && updateUserData.phone_number) {
      user.phone_number = updateUserData.phone_number;
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
