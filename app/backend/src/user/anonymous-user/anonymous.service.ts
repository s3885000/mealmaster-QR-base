import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { User, UserRole } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from 'src/jwt/token/token.service';

@Injectable()
export class AnonymousService {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService) {}

    async generateAnonymousUser(): Promise<{ accessToken:string, refreshToken: string }> {
        const user = new User();
        user.is_guest = true;
        user.role = UserRole.GUEST;
        user.guest_id = uuid();
        
        // Save the user to the database FIRST
        await this.userRepository.save(user);
        
        // After saving, the user's id will be populated
        const refreshToken = this.tokenService.generateRefreshToken(user.id.toString());
        const accessToken = this.tokenService.generateAccessToken(user.id.toString());
    
        user.refresh_token = refreshToken;
        await this.userRepository.save(user);
    
        return { accessToken, refreshToken };
    }
    
    async isAnonymousUser(guest_id: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { guest_id } });
        return user?.is_guest ?? false;
    }
    
    async deleteAnonymousUser(guest_id: string): Promise<void> {
        const user = await this.userRepository.findOne({where: { guest_id }});
        if (user) {
            await this.userRepository.delete(user.id);
        }
    }

}

