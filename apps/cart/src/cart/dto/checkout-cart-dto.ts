import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { AddressEntity } from '../entities/address.entity';

export class CheckoutCartDto {
  @ApiProperty()
  @IsUUID()
  paymentMethodId: string;

  @ApiProperty()
  @IsOptional()
  address: AddressEntity;

  constructor(partial: Partial<CheckoutCartDto>) {
    Object.assign(this, partial);
  }
}
