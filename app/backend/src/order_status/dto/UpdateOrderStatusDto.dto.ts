import { IsEnum } from "class-validator";
import { Status } from "../entity/orderStatus.entity";

export class UpdateOrderStatusDto {
    @IsEnum(Status)
    status: Status;
}