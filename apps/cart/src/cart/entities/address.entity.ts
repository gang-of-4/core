import { ApiProperty } from '@nestjs/swagger';

export class AddressEntity {
  @ApiProperty()
  country: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  postalCode: string;

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
