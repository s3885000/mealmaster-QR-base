import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRestaurantRequestDto {
  @IsNumber({}, { message: 'user_id must be a number' })
  @IsNotEmpty({ message: 'user_id should not be empty' })
  user_id: number;

  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @IsString({ message: 'logo must be a string' })
  @IsNotEmpty({ message: 'logo should not be empty' })
  logo: string;

  @IsString({ message: 'banner must be a string' })
  @IsNotEmpty({ message: 'banner should not be empty' })
  banner: string;
}
