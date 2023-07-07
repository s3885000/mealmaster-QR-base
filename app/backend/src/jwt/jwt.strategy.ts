import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entity/user.entity";
import { UserService } from "src/user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('auth.jwtSecret'),
        });
    }

    async validate(payload: any): Promise<User> {
        // Implement logic to validate the user. Check if the user exists in the database
        const user = await this.userService.findUserById(payload.sub);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}