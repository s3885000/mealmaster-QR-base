import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class RefreshTokenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean>{
        const request = context.switchToHttp().getRequest();
        const refreshToken = request.body.refreshToken;

        try { 
            this.jwtService.verify(refreshToken); //Throw an error if the refresh token is invalid
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        return true;
    }
}