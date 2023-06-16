import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { UserRole } from '../entity/user.entity';
import { IsPhoneNumberOrEmail } from "./is-phoneNo-or-Email.decorator";


export class LoginUserDto {
  @IsPhoneNumberOrEmail('email')
  @IsOptional()
  @Length(10, 10, { message: "Phone Number must be 10 digits"})
  phoneNumber?: string;

  @IsPhoneNumberOrEmail('phoneNumber')
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  role?: UserRole;
}
