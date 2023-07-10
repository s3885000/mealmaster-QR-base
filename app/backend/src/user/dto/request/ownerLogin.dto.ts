import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRole } from "src/user/entity/user.entity";


export class OwnerLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    password: string;

    role: UserRole
  }