import { IsEnum } from 'class-validator';
import { PickupType } from 'src/cart/entity/cart.entity';


export class UpdatePickupTypeDto {
    @IsEnum(PickupType)
    pickup_type: PickupType;
}
