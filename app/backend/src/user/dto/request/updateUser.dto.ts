import { IsEmail, IsOptional, Length, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @Length(1, 255, { message: 'First name must be between 1 and 255 characters'})
  first_name?: string;

  @IsOptional()
  @Length(1, 255, { message: 'Last name must be between 1 and 255 characters'})
  last_name?: string;

  @IsOptional()
  profile_picture?: string;

  @IsOptional()
  @Length(10, 10, { message: 'Phone number must be 10 digits'})
  phone_number?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters'})
  password: string;
}