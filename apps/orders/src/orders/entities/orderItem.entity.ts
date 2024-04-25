import { ApiProperty } from '@nestjs/swagger';
import { $Enums, OrderItem } from '@prisma/client/orders';
import { Decimal } from '@prisma/client/orders/runtime/library';
import { Exclude, Transform, Type } from 'class-transformer';
import { ItemImageEntity } from './item-image.entity';
import { OptionGroupEntity } from './option-group.entity';

export class OrderItemEntity implements OrderItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: Decimal })
  @Transform(({ value }) => value?.toNumber())
  @Type(() => Number)
  price: Decimal;

  @ApiProperty()
  @Type(() => ItemImageEntity)
  itemImages: ItemImageEntity[];

  @Exclude()
  orderId: string;

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  status: $Enums.ItemStatus;

  @ApiProperty()
  @Type(() => OptionGroupEntity)
  groups: OptionGroupEntity[];

  @ApiProperty()
  isVariant: boolean;

  constructor(partial: Partial<OrderItemEntity>) {
    Object.assign(this, partial);
  }
}
