import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    //Register user
    async registerUser(createUserDto: CreateUserDto): Promise<string> {
        const { phoneNumber, password } = createUserDto;

        const userExists = await this.userRepository.findOne({ where: { phoneNumber }});

        if (userExists) {
            throw new ConflictException('Phone number already exists!')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User();
        user.phoneNumber = phoneNumber;
        user.password = hashedPassword;

        await this.userRepository.save(user);

        return 'Register Sucessfully!';
    }

    //Login user
    async loginUser(loginUserDto: LoginUserDto): Promise<string> {
        const { phoneNumber, password } = loginUserDto;

        const user = await this.userRepository.findOne({ where: { phoneNumber} });
        
        if (!user) {
            throw new NotFoundException('User not found!')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password!');
        }

        return 'Login succesfully!'
    }
}
