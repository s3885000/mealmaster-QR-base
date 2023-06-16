import { UserProfileResponseDto } from "./user-profile-res.dto";

export class RegisterResponseDto {
    message: string;
    user: UserProfileResponseDto;
  }