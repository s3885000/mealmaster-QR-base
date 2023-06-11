import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Session } from './entity/session.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly jwtService: JwtService
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { phoneNumber, password } = createUserDto;

    const userExists = await this.userRepository.findOne({ where: { phoneNumber } });

    if (userExists) {
      throw new ConflictException('Phone number already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({ 
        phoneNumber, 
        password: hashedPassword,
        });
    await this.userRepository.save(user);

    return user;
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<{ user: User, token: string }> {
    const { phoneNumber, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where:{ phoneNumber }});

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password!');
    }

    const token = await this.generateToken(user);

    return { user, token };
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phoneNumber } });
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { refreshToken } });
  }

  async invalidateRefreshToken(userId: string): Promise<void> {
    const parsedUserId = parseInt(userId, 10);//Convert the userId to a number
    const user = await this.userRepository.findOne({ where: { id: parsedUserId } });
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
    user.refreshToken = null;
    await this.userRepository.save(user);
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

  private generateToken(user: User): string {
    const payload = { id: user.id, phoneNumber: user.phoneNumber}
    return this.jwtService.sign(payload);
  }

  async addSession(userId: string, token: string): Promise<void> {
    const session = this.sessionRepository.create({ userId, token});
    await this.sessionRepository.save(session);
  }

  async removeSession(userId: string): Promise<void> {
    const session = await this.sessionRepository.findOne({ where: {userId}});
    if (session) {
      await this.sessionRepository.remove(session);
    }
  }

  async findSessionByUserId(userId: string): Promise<Session | undefined> {
    return this.sessionRepository.findOne({ where: {userId}});
  }


}
