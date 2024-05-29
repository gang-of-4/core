import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Order } from '@prisma/client/orders';
import { Prisma } from '@prisma/client/orders';
import { Exclude, Transform, Type } from 'class-transformer';
import { AddressEntity } from './address.entity';
import { ItemEntity } from './item.entity';

export class OrderEntity implements Order {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  @Transform(({ value }) => value?.toNumber())
  @Type(() => Number)
  total: Prisma.Decimal;

  @ApiProperty()
  @Transform(({ value }) => value?.toNumber())
  @Type(() => Number)
  subtotal: Prisma.Decimal;

  @ApiProperty()
  status: $Enums.OrderStatus;

  @Exclude()
  addressId: string;

  @ApiProperty()
  @Type(() => AddressEntity)
  address: AddressEntity;

  @ApiProperty({
    type: ItemEntity,
    isArray: true,
    required: false,
  })
  @Type(() => ItemEntity)
  items: ItemEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  deletedAt: Date;

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
