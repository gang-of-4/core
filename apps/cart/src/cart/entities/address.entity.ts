import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@prisma/client/cart';
import { IsOptional } from 'class-validator';

export class AddressEntity implements Address {
  @ApiProperty()
  id: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  @IsOptional()
  notes: string;

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
