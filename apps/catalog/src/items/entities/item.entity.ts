import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Currency, Item } from '@prisma/client/catalog';
import { Exclude, Expose, Type } from 'class-transformer';
import { Decimal } from '@prisma/client/catalog/runtime/library';
import { CurrencyEntity } from './currency.entity';

export class ItemEntity implements Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: $Enums.ItemType;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: Decimal })
  @Type(() => Decimal)
  price: Decimal;

  @Exclude()
  currencyId: Currency['id'];

  @ApiProperty({ type: CurrencyEntity })
  @Type(() => CurrencyEntity)
  currency: CurrencyEntity;

  @ApiProperty()
  description: string;

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  status: $Enums.Status;

  @ApiProperty()
  order: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isTaxable: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['item.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }
}
