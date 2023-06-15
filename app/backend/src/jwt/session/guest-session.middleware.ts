import { Injectable, NestMiddleware } from "@nestjs/common";
import { AnonymousService } from "src/user/anonymous/anonymous.service";
import { SessionService } from "./session.service";
import { NextFunction, Request, Response } from "express";
import { GuestSession } from "./entity/guest-session.entity";



@Injectable()
export class GuestSessionMiddleware implements NestMiddleware {
    constructor(
        private readonly anonymousService: AnonymousService,
        private readonly sessionService: SessionService,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const tokenFromCookie = req.cookies['access-token']; // Assuming the key is 'access-token'
        let guestId = this.anonymousService.validateToken(tokenFromCookie).id;
        let session: GuestSession | undefined = await this.sessionService.findSessionByGuestId(guestId);
        
        if (!session) {
            res.status(401).send({ message: 'Token does not match with the database'});
            return;
        }

        if(this.anonymousService.isTokenExpired(tokenFromCookie)) {
            const newToken = this.anonymousService.generateAccessToken(guestId);
            session.token = newToken;
            await this.sessionService.addSession(guestId, newToken);
            res.cookie('access-token', newToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
            req.headers.authorization = `Bearer ${newToken}`;
        }else {
            req.headers.authorization = `Bearer @{tokenFromCookie}`;
        }

        next();
    }
}