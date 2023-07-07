import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AnonymousService } from "src/user/anonymous-user/anonymous.service";
import { RequestWithCookiesAndUser } from "src/types/requestWithCookiesAndUser";


@Injectable()
export class AnonymousGuard implements CanActivate{
    constructor ( private readonly anonymousService: AnonymousService) {}

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithCookiesAndUser>();
        const guestId = request.cookies['guest_id'];

        if (guestId) {
            // Handle guest user
            const isGuest = await this.anonymousService.isAnonymousUser(guestId);
            if (!isGuest) {
                request.user = { is_guest: true, guest_id: guestId };
                return true;
            }
        }

        return false;
    }
}