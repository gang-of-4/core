import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderStatus } from '@prisma/client/orders';
import { OptionType } from '@prisma/client/orders';

@Controller()
export class OrdersKafkaListener {
  constructor(
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
    private prisma: PrismaService,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('order.created');
    await this.kafkaClient.connect();
  }

  @MessagePattern('order.created')
  async createOrder(@Payload() message: CreateOrderDto) {
    await this.prisma.$transaction(async (tx) => {
      const createdGroups = [];
      const groups = message.items
        .filter((item) => item.isVariant)
        .flatMap((item) => item.variant.groups);

      for (const group of groups) {
        if (
          !(
            !createdGroups.includes(group.id) &&
            !(await this.prisma.optionGroup.findUnique({
              where: { id: group.id },
            }))
          )
        ) {
          continue;
        }
        await tx.optionGroup.create({
          data: {
            id: group.id,
            title: group.title,
            type: OptionType[group.type],
            order: group.order,
            options: {
              createMany: {
                data: group.options.map((option) => ({
                  id: option.id,
                  label: option.label,
                  value: option.value,
                })),
              },
            },
          },
        });
        createdGroups.push(group.id);
      }

      const order = await tx.order.create({
        data: {
          uuid: message.id,
          status: OrderStatus[message.status],
          userId: message.userId,
          total: message.total,
          subtotal: message.subtotal,
          address: {
            create: {
              city: message.address.city,
              country: message.address.country,
              postalCode: message.address.postalCode,
              state: message.address.state ?? '',
              street: message.address.street,
              notes: message.address.notes ?? '',
            },
          },
        },
      });

      for (const item of message.items) {
        const createdItem = await tx.item.create({
          data: {
            orderId: order.uuid,
            name: item.item?.name ?? item.variant?.parent.name,
            sku: item.item?.sku ?? item.variant?.parent.sku,
            price: item.item?.price ?? item.variant?.price,
            quantity: item.quantity,
            storeId: item.item?.storeId ?? item.variant?.parent.storeId,
            isVariant: item.isVariant,
            options: {
              connect: item.variant?.groups.flatMap((group) =>
                group.options.map((option) => ({
                  id: option.id,
                })),
              ),
            },
          },
        });

        for (const image of item.item?.images ?? item.variant?.parent.images) {
          await tx.image.create({
            data: {
              name: image.name,
              extension: image.extension,
              size: image.size,
              url: image.url,
              item: {
                connect: {
                  id: createdItem.id,
                },
              },
            },
          });
        }
      }
    });
  }
}
