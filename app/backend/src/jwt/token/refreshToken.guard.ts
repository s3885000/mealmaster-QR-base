import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class refreshTokenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean>{
        const request = context.switchToHttp().getRequest();
        const refresh_token = request.body.refresh_token;

        try { 
            this.jwtService.verify(refresh_token); //Throw an error if the refresh token is invalid
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        return true;
    }
}