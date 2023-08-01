import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { categoryIdentifier } from "src/catergory/entity/categoryIdentifier";


export class CreateCategoryRequestDto {
    @IsNotEmpty()
    @IsInt()
    restaurant_id: number;
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsIn([
        categoryIdentifier.BEST_SELLER,
        categoryIdentifier.APPETIZERS,
        categoryIdentifier.BURGER,
        categoryIdentifier.PIZZA,
        categoryIdentifier.NOODLE,
        categoryIdentifier.SOUP,
        categoryIdentifier.RICE,
        categoryIdentifier.BEVERAGE,
        categoryIdentifier.DESSERT,
    ])
    identifier: categoryIdentifier;

    @IsOptional()
    @IsString()
    description?: string;
}