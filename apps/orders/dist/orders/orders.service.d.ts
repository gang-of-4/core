import { PrismaService } from 'src/prisma/prisma.service';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(role: string): Promise<string>;
    findOneOrFail(id: string, role: string): Promise<string>;
    updateOrderStatus(id: string, role: string): Promise<string>;
    updateOrderItemStatus(id: string, itemId: string, role: string): Promise<string>;
    cancelOrder(id: string, role: string): Promise<string>;
}
