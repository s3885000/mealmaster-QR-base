import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";


@Injectable()
export class RefreshTokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        ) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const refresh_token = request.body.refresh_token;

        let decodedToken;
        try {
            decodedToken = this.jwtService.verify(refresh_token); 
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        // Ensure the user associated with the token still exists and the token hasn't been revoked.
        const user = await this.userService.findUserById(decodedToken.sub);
        if (!user || user.refresh_token !== refresh_token) {
            throw new UnauthorizedException ('Invalid refresh token');
        }
        
        return true;
    }
}