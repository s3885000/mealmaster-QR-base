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

    async generateAnonymousUser(): Promise<User> {
        const user = new User();
        user.is_guest = true;
        user.role = UserRole.GUEST;
        user.guest_id = uuid();
        // Generate refresh token for the guest user
        user.refresh_token = this.tokenService.generateRefreshToken(user.guest_id);
        return await this.userRepository.save(user);
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

