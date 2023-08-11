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
        categoryIdentifier.APPETIZER,
        categoryIdentifier.BURGER,
        categoryIdentifier.PIZZA,
        categoryIdentifier.NOODLES,
        categoryIdentifier.SEAFOOD,
        categoryIdentifier.RICE,
        categoryIdentifier.BEVERAGE,
        categoryIdentifier.DESSERT,
        categoryIdentifier.SALAD,
        categoryIdentifier.ICECREAM,
    ])
    identifier: categoryIdentifier;

    @IsOptional()
    @IsString()
    description?: string;
}