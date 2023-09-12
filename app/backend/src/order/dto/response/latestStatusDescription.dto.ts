import { Order } from "src/order/entity/order.entity";
import { Status } from "src/order_status/entity/orderStatus.entity";

export class OrderWithLatestStatus extends Order {
    latestStatusDescription?: Status;
}