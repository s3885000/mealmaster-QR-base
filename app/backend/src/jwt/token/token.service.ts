import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

  generateAccessToken(userId: number | string): string {
      const payload = { sub: userId.toString() }; // Convert to string to ensure consistency
      const expiresIn = this.configService.get<string>('auth.accessTokenExpiration');
      return this.jwtService.sign(payload, { expiresIn });
  }

  generateRefreshToken(userId: number | string): string {
      const payload = { sub: userId.toString() }; // Convert to string to ensure consistency
      const expiresIn = this.configService.get<string>('auth.refreshTokenExpiration');
      return this.jwtService.sign(payload, { expiresIn });
  }

  async refreshAccessToken(oldRefreshToken: string): Promise<{accessToken: string, refreshToken:string}> {
    try {
      const decodedToken = this.jwtService.verify(oldRefreshToken);
      const { sub } = decodedToken;
      await this.invalidateRefreshToken(sub);

      // generate and save new refresh token
      const newRefreshToken = this.generateRefreshToken(sub);
      await this.userService.updateRefreshToken(sub, newRefreshToken);

      // generate new access token
      const accessToken = this.generateAccessToken(sub);
      
      return {accessToken, refreshToken: newRefreshToken};
      
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async invalidateRefreshToken(userId: string): Promise<void> {
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

  async validateAccessToken(token: string, options?: JwtVerifyOptions): Promise<any> {
    try {
        return await this.jwtService.verifyAsync(token, options);
    } catch (error) {
        throw new UnauthorizedException('Invalid token');
    }
  }
}

