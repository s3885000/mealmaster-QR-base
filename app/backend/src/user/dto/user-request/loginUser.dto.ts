import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { UserRole } from '../../entity/user.entity';


export class LoginUserDto {
  @IsOptional()
  @Length(10, 10, { message: "Phone Number must be 10 digits"})
  phone_number?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  role?: UserRole;
}
