import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { TokenService } from '../../jwt/token/token.service'; 

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1];

    if (token) {
        try {
            const decodedToken = await this.tokenService.validateAccessToken(token);
            request.user = await this.userService.findUserById(decodedToken.sub);
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    } else {
        throw new UnauthorizedException('No token provided');
    }
  }
}

