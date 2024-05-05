import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderEntity } from '../entities/order.entity';
import { isUUID } from 'class-validator';
import { OrderStatus, ItemStatus } from '@prisma/client/orders';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    role: string = 'guest',
    userId?: string,
    storeId?: string,
  ): Promise<OrderEntity[]> {
    if (role === 'guest') {
      return [];
    }
    const orders = await this.prisma.order.findMany({
      ...(role !== 'admin' && {
        where: {
          ...(role == 'vendor' && {
            items: {
              some: {
                storeId,
              },
            },
          }),
          ...(role == 'customer' && {
            userId,
          }),
        },
      }),
      include: {
        address: true,
        items: {
          include: {
            options: {
              include: {
                group: true,
              },
            },
            images: true,
          },
        },
      },
    });

    return orders.map((order) => {
      return new OrderEntity({
        ...order,
        items: order.items.map((orderItem) => {
          const { options, ...item } = orderItem;
          const groups = options.reduce((acc, option) => {
            if (!acc[option.group.id]) {
              acc[option.group.id] = option.group;
            }
            const { group, ...data } = option;
            acc[group.id].options = [...(acc[group.id].options || []), data];
            return acc;
          }, {});
          console.log();
          return {
            ...item,
            groups: Object.values(groups),
          };
        }),
      });
    });
  }

  async findOneOrFail(
    id?: number | string,
    role: string = 'guest',
    userId?: string,
    storeId?: string,
  ): Promise<OrderEntity> {
    if (role === 'guest') {
      return null;
    }
    const order = await this.prisma.order.findFirst({
      where: {
        ...(isUUID(id, '4')
          ? {
              uuid: id as string,
            }
          : {
              id: Number(id) || 0,
            }),
        ...(role == 'vendor' && {
          items: {
            some: {
              storeId,
            },
          },
        }),
        ...(role == 'customer' && {
          userId,
        }),
      },
      include: {
        address: true,
        items: {
          include: {
            options: {
              include: {
                group: true,
              },
            },
            images: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    return new OrderEntity({
      ...order,
      items: order.items.map((orderItem) => {
        const { options, ...item } = orderItem;
        const groups = options.reduce((acc, option) => {
          if (!acc[option.group.id]) {
            acc[option.group.id] = option.group;
          }
          const { group, ...data } = option;
          acc[group.id].options = [...(acc[group.id].options || []), data];
          return acc;
        }, {});
        return {
          ...item,
          groups: Object.values(groups),
        };
      }),
    });
  }

  async findOne(
    id?: number | string,
    role: string = 'guest',
    userId?: string,
    storeId?: string,
  ): Promise<OrderEntity> {
    if (role === 'guest') {
      return null;
    }
    const order = await this.prisma.order.findFirst({
      where: {
        ...(isUUID(id, '4')
          ? {
              uuid: id as string,
            }
          : {
              id: Number(id) || 0,
            }),
        ...(role == 'vendor' && {
          items: {
            some: {
              storeId,
            },
          },
        }),
        ...(role == 'customer' && {
          userId,
        }),
      },
    });

    return new OrderEntity({
      ...order,
    });
  }

  async updateOrderStatus(
    status: string,
    id?: number | string,
    role: string = 'guest',
    userId?: string,
    storeId?: string,
  ): Promise<OrderEntity> {
    const order = await this.findOne(id, role, userId, storeId);

    if (!order || role !== 'admin') {
      throw new NotFoundException();
    }

    if (!(status in OrderStatus)) {
      throw new BadRequestException('Invalid status');
    }

    await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: OrderStatus[status],
      },
    });

    return await this.findOneOrFail(id, role, userId, storeId);
  }

  async updateOrderItemStatus(
    status: string,
    itemId: string,
    id?: number | string,
    role: string = 'guest',
    userId?: string,
    storeId?: string,
  ): Promise<OrderEntity> {
    const order = await this.findOne(id, role, userId, storeId);

    if (!order || role !== 'admin') {
      throw new NotFoundException();
    }

    if (!(status in ItemStatus)) {
      throw new BadRequestException('Invalid status');
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('Order is cancelled');
    }

    await this.prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        status: ItemStatus[status],
      },
    });

    return await this.findOneOrFail(id, role, userId, storeId);
  }

  async cancelOrder(
    id?: number | string,
    role: string = 'guest',
    userId?: string,
  ) {
    const order = await this.findOneOrFail(id, role, userId);

    if (!order || !['admin', 'customer'].includes(role)) {
      throw new NotFoundException();
    }

    if (
      order.items.reduce(
        (acc, item) => acc && item.status === ItemStatus.READY,
        true,
      )
    ) {
      throw new BadRequestException('Order cannot be cancelled');
    }

    await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: OrderStatus.CANCELLED,
      },
    });

    return await this.findOneOrFail(id, role, userId);
  }
}
