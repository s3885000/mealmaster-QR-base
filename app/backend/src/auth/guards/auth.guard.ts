import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { AnonymousService } from 'src/user/anonymous-user/anonymous.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly anonymousService: AnonymousService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1];

    if (token) {
      try {
        const payload = this.jwtService.verify(token);
        let user: User | undefined;
        if (payload.role === 'guest') {
          const isGuest = await this.anonymousService.isAnonymousUser(payload.sub);
          if (isGuest) {
            throw new UnauthorizedException('Invalid token');
          }
          user = await this.userService.findUserByGuestId(payload.sub);
        } else {
          user = await this.userService.findUserById(payload.sub);
        }

        if (!user) {
          throw new UnauthorizedException('User not found!');
        }
        request.user = user; // Attach the authenticated user to the request object
        return true;
      } catch (error) {
        // Invalid token
        throw new UnauthorizedException('Invalid token');
      }
      
      // No token provided
    }
  }      
}
