import { ApiProperty } from '@nestjs/swagger';

export class CartItemEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  itemId: string;

  @ApiProperty()
  cartId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  item?: any;

  constructor(partial: Partial<CartItemEntity>) {
    Object.assign(this, partial);
  }
}
