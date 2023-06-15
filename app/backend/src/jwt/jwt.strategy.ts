import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entity/user.entity";
import { UsersService } from "src/users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('auth.jwtSecret'),
        });
    }

    async validate(payload: any): Promise<User> {
        // Implement logic to validate the user. Check if the user exists in the database
        const user = await this.usersService.findUserById(payload.sub);

        if (!user) {
            throw new UnauthorizedException();
        }
        
        return user;
    }
}