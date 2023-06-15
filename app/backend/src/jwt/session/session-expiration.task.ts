import { Injectable, Logger } from "@nestjs/common";
import { SessionService } from "./session.service";
import { Cron } from "@nestjs/schedule";


@Injectable()
export class SessionExpirationTask {
    private readonly logger = new Logger(SessionExpirationTask.name);

    constructor(private readonly sessionService: SessionService) {}
    
    @Cron('O O * * *') // Run the task everyday at midnight (* * * * *) minute, hour, day of the month, month, day of the week
    async handleSessionExpiration() {
        try{
            this.logger.debug('Running session expiration task...');
            await this.sessionService.removeExpiredSession();
            this.logger.debug('Session expiration task completed.');
        } catch (error) {
            this.logger.error('An error occurred while running the session expiration task:', error);
        }
    }
}