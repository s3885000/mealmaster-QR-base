import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AnonymousService } from './anonymous/anonymous.service';
import { AnonymousGuard } from './anonymous/anonymous.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly anonymousService: AnonymousService) {}

    @Get('anonymous-login')
    anonymousLogin(): { id: string, token: string } {
        const id = this.anonymousService.generateRandomId();
        const token = this.anonymousService.generateAccessToken(id)
        return { id, token };
    }

    @Get('me')
    @UseGuards(AnonymousGuard)
    getAuthenticatedUser(@Query('id') id: string, @Query('token') token: string): string {
        try {
            const payload = this.anonymousService.validateToken(token);
            if (payload.id === id && this.anonymousService.isAnonymousUser(id)) {
                return `Hello, Anonymous user with ID: ${id}`;
            }
        } catch (error) {
            return 'Invalid or non-anonymous user';
        }
    }

}
