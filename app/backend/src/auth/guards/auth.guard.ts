import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1];

    if (token) {
      try {
        const payload = this.jwtService.verify(token);
        const user = await this.usersService.findUserById(payload.sub);
        request.user = user; // Attach the authenticated user to the request object
        return true;
      } catch (error) {
        // Invalid token
        throw new UnauthorizedException('Invalid token');
      }
    }

    // No token provided
    throw new UnauthorizedException('No token provided');
  }
}
