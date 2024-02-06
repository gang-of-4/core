import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client/catalog';
import { Expose, Type } from 'class-transformer';
import { Decimal } from '@prisma/client/catalog/runtime/library';

export class CurrencyEntity implements Currency {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty({ type: Decimal })
  @Type(() => Decimal)
  exchangeRate: Decimal;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDefault: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['currency.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<CurrencyEntity>) {
    Object.assign(this, partial);
  }
}
