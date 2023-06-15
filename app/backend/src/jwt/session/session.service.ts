import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { GuestSession } from "src/jwt/session/entity/guest-session.entity";
import { Repository } from "typeorm";


@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(GuestSession)
        private readonly sessionRepository: Repository<GuestSession>) { }

    async addSession(guestId: string, token: string): Promise<void> {
        const session = this.sessionRepository.create({ guestId, token, lastUsed: new Date() });
        await this.sessionRepository.save(session);
      }
    
      async removeSession(guestId: string): Promise<void> {
        const session = await this.sessionRepository.findOne({ where: { guestId }});
        if (session) {
          await this.sessionRepository.remove(session);
        }
      }
    
    async findSessionByGuestId(guestId: string): Promise<GuestSession | undefined> {
      const session = await this.sessionRepository.findOne({ where: { guestId }});

      if (session) {
        //Update the lastUsed field everytime a session is used
        session.lastUsed = new Date();
        await this.sessionRepository.save(session);
      }
      return session;
      
    }

    async removeExpiredSession(): Promise<void> {
      const expirationPeriod = 30; // Expiration period in days

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - expirationPeriod);

      await this.sessionRepository
      .createQueryBuilder()
      .delete()
      .from(GuestSession)
      .where('lastUsed < :currentDate', { currentDate: currentDate.toISOString() })
      .execute();
    }
}

