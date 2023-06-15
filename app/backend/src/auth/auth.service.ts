import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User, UserRole } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
        ) {}

    async loginUser(loginUserDto: LoginUserDto): Promise<{ user: User, token: string }> {
        const { phoneNumber, password, email, role = UserRole.CUSTOMER } = loginUserDto;

        let user: User | undefined;

        if (role === UserRole.CUSTOMER) {
            user = await this.userRepository.findOne({ where: { phoneNumber }});
        } else if (role === UserRole.RESTAURANT_OWNER) {
            user = await this.userRepository.findOne({ where: { email }});
        }
    
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
    
    private generateToken(user: User): string {
        const payload = { id: user.id, phoneNumber: user.phoneNumber, email: user.email, role: user.role };
        return this.jwtService.sign(payload);
      }
}
