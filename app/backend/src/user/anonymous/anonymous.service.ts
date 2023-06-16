import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { JwtPayload } from '../../jwt/jwt-payload.interface';

@Injectable()
export class AnonymousService {
    private anonymouUsers: string[] = [];

    constructor(private readonly jwtService: JwtService) {}

    generateRandomId(): string {
        const id = uuid();
        this.anonymouUsers.push(id);
        return id;
    }

    generateAccessToken( id:string ): string {
        const payload: JwtPayload = { id };
        return this.jwtService.sign(payload, { expiresIn: '7d'});
    }
    
    isAnonymousUser( id:string ): boolean {
        return this.anonymouUsers.includes(id);
    }

    validateToken( token: string ): JwtPayload {
        return this.jwtService.verify(token);
    }

    isTokenExpired(token: string): boolean {
        try {
            const decodedToken = this.jwtService.decode(token) as any;
            const expirationDate = new Date(decodedToken.exp * 1000); //jwt exp in seconds
            return expirationDate < new Date();
        } catch (e) {
            // Failed to decode or validate token, consider it as expired
            return true;
        }
    }
}

