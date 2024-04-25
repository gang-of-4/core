import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(role: string) {
    return `Orders for ${role}!`;
  }

  async findOneOrFail(id: string, role: string = 'guest') {
    return `Order with id ${id} for ${role}!`;
  }

  async updateOrderStatus(id: string, role: string) {
    return `Order with id ${id} has been updated by ${role}!`;
  }

  async updateOrderItemStatus(id: string, itemId: string, role: string) {
    return `Item with id ${itemId} in Order with id ${id} has been updated by ${role}!`;
  }

  async cancelOrder(id: string, role: string) {
    return `Order with id ${id} has been cancelled by ${role}!`;
  }
}
