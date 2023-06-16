import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AnonymousService } from "../../user/anonymous-user/anonymous.service";
import { Request } from "express";


@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(private readonly anonymousService: AnonymousService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const id = request.query.id as string;
    const token = request.query.token as string;

    try {
      const payload = this.anonymousService.validateToken(token);
      return this.anonymousService.isAnonymousUser(id) && payload.id === id;
    } catch (error) {
      return false;
    }

  }
}
