import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "generate_key/SecretKey-constants";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entity/user.entity";
import { UsersService } from "src/users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any): Promise<User> {
        // Implement logic to validate the user. Check if the user exists in the database
        const user = await this.usersService.findUserByPhoneNumber(payload.phoneNumber);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}