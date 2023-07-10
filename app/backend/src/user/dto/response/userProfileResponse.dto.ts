import { UserRole } from "src/user/entity/user.entity";

export class UserProfileResponseDto {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: string;
    phone_number: string;
    email: string;
    role: UserRole;
  }