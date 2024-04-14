import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CartItemEntity } from './cartItem.entity';

export class CartEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  paymentMethodId?: string;

  @ApiProperty()
  addressId?: string;

  @ApiProperty({ type: CartItemEntity, isArray: true, nullable: true })
  @Type(() => CartItemEntity)
  cartItems: CartItemEntity[];

  @ApiProperty()
  subtotal?: number;

  @ApiProperty()
  total?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CartEntity>) {
    Object.assign(this, partial);
  }
}
