import { UserProfileResponseDto } from "./userProfileResponse.dto";

export class RegisterResponseDto {
    message: string;
    user: UserProfileResponseDto;
  }