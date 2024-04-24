import { OrdersService } from './orders.service';
import { JwtService } from '@nestjs/jwt';
export declare class OrdersController {
    private readonly ordersService;
    private jwtService;
    constructor(ordersService: OrdersService, jwtService: JwtService);
    findAll(authorization: string): Promise<string>;
    findOne(id: string, authorization: string): Promise<string>;
    updateOrderStatus(id: string, authorization: string): Promise<string>;
    updateOrderItemStatus(id: string, itemId: string, authorization: string): Promise<string>;
    cancelOrder(id: string, authorization: string): Promise<string>;
}
