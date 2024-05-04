import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { CartItemEntity } from './cartItem.entity';
import { AddressEntity } from './address.entity';
import { Cart } from '@prisma/client/cart';

export class CartEntity implements Cart {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Exclude()
  userId: string;

  @ApiProperty()
  paymentMethodId?: string;

  @Exclude()
  addressId: string;

  @ApiProperty()
  address?: AddressEntity;

  @ApiProperty({ type: CartItemEntity, isArray: true, nullable: true })
  @Type(() => CartItemEntity)
  cartItems?: CartItemEntity[];

  @ApiProperty()
  @Expose()
  get subtotal(): number {
    return this?.cartItems?.reduce((acc, cartItem) => {
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
  isAvailable?: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Omit<CartEntity, 'subtotal' | 'total'>>) {
    Object.assign(this, partial);
  }
}
