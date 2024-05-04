import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from '../entities/address.entity';
import { CartItemEntity } from '../entities/cartItem.entity';
import { Expose } from 'class-transformer';
// import { ItemEntity } from './item.entity';
// import { Exclude, Type } from 'class-transformer';
// import { CartItem } from '@prisma/client/cart';
// import { Item, Variant } from '../common/interfaces/catalog.interface';

export class CreateOrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  @Expose()
  get subtotal(): number {
    return this?.items?.reduce((acc, cartItem) => {
      return (
        acc +
        (cartItem?.item?.price ?? cartItem?.variant?.price) * cartItem?.quantity
      );
    }, 0);
  }

  @ApiProperty()
  @Expose()
  get total(): number {
    return this.subtotal;
  }

  @ApiProperty()
  status: string;

  @ApiProperty()
  address: AddressEntity;

  @ApiProperty({
    type: CartItemEntity,
    isArray: true,
    required: true,
  })
  items: CartItemEntity[];

  constructor(partial: Partial<CreateOrderDto>) {
    Object.assign(this, partial);
  }
}
