import { ApiProperty } from '@nestjs/swagger';
import { ItemEntity } from './item.entity';
import { Exclude, Type } from 'class-transformer';
import { CartItem } from '@prisma/client/cart';
import { VariantEntity } from './variant.entity';
// import { Item, Variant } from '../common/interfaces/catalog.interface';

export class CartItemEntity implements CartItem {
  @ApiProperty()
  id: string;

  @Exclude()
  itemId: string;

  @ApiProperty()
  @Type(() => ItemEntity)
  item?: ItemEntity;

  @ApiProperty()
  @Type(() => VariantEntity)
  variant?: VariantEntity;

  @Exclude()
  cartId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  isVariant: boolean;

  @ApiProperty()
  isAvailable?: boolean;

  constructor(partial: Partial<CartItemEntity>) {
    Object.assign(this, partial);
  }
}
