import { Request } from 'express';

export interface RequestWithCookiesAndUser extends Request {
    cookies: {
        [key: string]: string;
    };
    user: {
        is_guest: boolean;
        guest_id: string;
    };
}