import { ApiProperty } from '@nestjs/swagger';
import { OrderAddress } from '@prisma/client/orders';

export class OrderAddressEntity implements OrderAddress {
  @ApiProperty()
  id: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  notes: string;

  constructor(partial: Partial<OrderAddressEntity>) {
    Object.assign(this, partial);
  }
}
