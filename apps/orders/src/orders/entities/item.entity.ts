import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Item } from '@prisma/client/orders';
import { Prisma } from '@prisma/client/orders';
import { Exclude, Transform, Type } from 'class-transformer';
import { ImageEntity } from './item-image.entity';
import { OptionGroupEntity } from './option-group.entity';

export class ItemEntity implements Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: Prisma.Decimal })
  @Transform(({ value }) => value?.toNumber())
  @Type(() => Number)
  price: Prisma.Decimal;

  @ApiProperty()
  @Type(() => ImageEntity)
  images?: ImageEntity[];

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

  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }
  orderItemId?: string;
}
