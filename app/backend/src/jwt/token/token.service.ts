import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

  generateAccessToken(userId: string): string {
    const payload = { sub: userId };
    const expiresIn = this.configService.get<string>('auth.accessTokenExpiration');
    return this.jwtService.sign(payload, { expiresIn });
  }

  generaterefresh_token(userId: string): string {
    const payload = { sub: userId };
    const expiresIn = this.configService.get<string>('auth.refresh_tokenExpiration');
    return this.jwtService.sign(payload, { expiresIn });
  }

  async refreshAccessToken(oldrefresh_token: string): Promise<string> {
    try {
      const decodedToken = this.jwtService.verify(oldrefresh_token);
      const { sub } = decodedToken;
      await this.invalidaterefresh_token(sub);
      return this.generateAccessToken(sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async invalidaterefresh_token(userId: string): Promise<void> {
    const parsedUserId = parseInt(userId, 10);//Convert the userId to a number
    const user = await this.userRepository.findOne({ where: { id: parsedUserId } });
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
    user.refresh_token = null;
    await this.userRepository.save(user);
  }

  async validateToken(token: string, options?: JwtVerifyOptions): Promise<any> {
    try {
      return this.jwtService.verify(token, options);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

