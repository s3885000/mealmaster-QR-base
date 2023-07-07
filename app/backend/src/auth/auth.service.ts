import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerLoginDto } from 'src/user/dto/user-request/customerLogin';
import { OwnerLoginDto } from 'src/user/dto/user-request/ownerLogin.dto';
import { User, UserRole } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../jwt/token/token.service';
import { AnonymousService } from '../user/anonymous-user/anonymous.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly anonymousService: AnonymousService
  ) {}

  private async loginUser(loginUserDto: CustomerLoginDto | OwnerLoginDto): Promise<User> {
    let user: User | undefined;

    if ('phone_number' in loginUserDto) {
        // This is a CustomerLoginDto
        user = await this.userRepository.findOne({ where: { phone_number: loginUserDto.phone_number, role: UserRole.CUSTOMER } });
      } else if ('email' in loginUserDto) {
        // This is a OwnerLoginDto
        user = await this.userRepository.findOne({ where: { email: loginUserDto.email, role: UserRole.RESTAURANT_OWNER } });
      }

    if (!user) {
        throw new NotFoundException('User not found!');
    }

    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password!');
    }

    return user;
  }

  async customerLogin(loginUserDto: CustomerLoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.loginUser(loginUserDto);
    const accessToken = this.tokenService.generateAccessToken(user.id.toString());
    const refreshToken = this.tokenService.generateRefreshToken(user.id.toString());
    await this.userService.updateRefreshToken(user.id.toString(), refreshToken);
    return { accessToken, refreshToken };
  }

  async ownerLogin(loginUserDto: OwnerLoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.loginUser(loginUserDto);
    const accessToken = this.tokenService.generateAccessToken(user.id.toString());
    const refreshToken = this.tokenService.generateRefreshToken(user.id.toString());
    await this.userService.updateRefreshToken(user.id.toString(), refreshToken);
    return { accessToken, refreshToken };
  }


  async logoutUser(accessToken: string): Promise<void> {
    const payload = await this.tokenService.validateToken(accessToken);
    const userId = payload.sub;
    
    // Check if the user is a guest
    const user = await this.userService.findUserById(userId);
    const isGuest = user?.is_guest ?? false;
    const guestId = user?.guest_id ?? null;
    
    // Invalidate the refresh token
    await this.tokenService.invalidateRefreshToken(userId.toString());
    
    // Delete the guest user if applicable
    if (isGuest && guestId) {
      await this.anonymousService.deleteAnonymousUser(guestId);
    }
    
    // Clear the refresh token for user
    await this.userService.clearRefreshToken(userId.toString());
  }
}
