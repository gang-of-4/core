import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Decimal } from '@prisma/client/cart/runtime/library';
import {
  Category,
  Media,
  OptionGroup,
  Variant,
} from '../common/interfaces/catalog.interface';

export class ItemEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  @Type(() => Number)
  @Transform(({ value }) => value?.toNumber())
  quantity: number;

  @ApiProperty({ type: Decimal })
  @Type(() => Number)
  price: any;

  @ApiProperty()
  description: string;

  @ApiProperty()
  categories: Category[];

  @ApiProperty()
  groups: OptionGroup[];

  @ApiProperty()
  variants: Variant[];

  @ApiProperty()
  images: Media[];

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  status: any;

  @ApiProperty()
  @Type(() => Number)
  @Transform(({ value }) => value?.toNumber())
  order: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }
}
