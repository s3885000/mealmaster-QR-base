import { IsNotEmpty, Length } from "class-validator";
import { UserRole } from "src/user/entity/user.entity";

export class CustomerLoginDto {
  @IsNotEmpty()
  @Length(10, 10, { message: "Phone number must be 10 digits"})
  phone_number: string;

  @IsNotEmpty()
  password: string;

  role: UserRole;
}
