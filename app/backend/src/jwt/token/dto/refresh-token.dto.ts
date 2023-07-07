import { IsNotEmpty } from "class-validator";


export class refresh_tokenDto {
    @IsNotEmpty()
    refresh_token: string;
}