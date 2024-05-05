import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Order } from '@prisma/client/orders';
import { Decimal } from '@prisma/client/orders/runtime/library';
import { Exclude, Transform, Type } from 'class-transformer';
import { OrderAddressEntity } from './orderAddress.entity';
import { OrderItemEntity } from './orderItem.entity';

export class OrderEntity implements Order {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  @Transform(({ value }) => value?.toNumber())
  @Type(() => Number)
  total: Decimal;

  @ApiProperty()
  @Transform(({ value }) => value?.toNumber())
  @Type(() => Number)
  subtotal: Decimal;

  @ApiProperty()
  status: $Enums.OrderStatus;

  @Exclude()
  orderAddressId: string;

  @ApiProperty()
  @Type(() => OrderAddressEntity)
  orderAddress: OrderAddressEntity;

  @ApiProperty({
    type: OrderItemEntity,
    isArray: true,
    required: false,
  })
  @Type(() => OrderItemEntity)
  orderItems: OrderItemEntity[];

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
