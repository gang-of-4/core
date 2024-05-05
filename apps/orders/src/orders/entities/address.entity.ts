import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@prisma/client/orders';

export class AddressEntity implements Address {
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

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
