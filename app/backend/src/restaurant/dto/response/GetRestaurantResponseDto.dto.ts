import { CreateResAddressResponseDto } from "src/res_address/dto/response/CreateResAddressResponseDto.dto";

export class GetRestaurantResponseDto {
    id: number;
    user_id: number
    name: string;
    logo: string;
    banner: string;
    address: CreateResAddressResponseDto;
}