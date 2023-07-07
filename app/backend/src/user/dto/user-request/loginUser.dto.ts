import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { UserRole } from '../../entity/user.entity';
import { Isphone_numberOrEmail } from "../isPhoneNoOrEmail.decorator";


export class LoginUserDto {
  @Isphone_numberOrEmail('email')
  @IsOptional()
  @Length(10, 10, { message: "Phone Number must be 10 digits"})
  phone_number?: string;

  @Isphone_numberOrEmail('phone_number')
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  role?: UserRole;
}
