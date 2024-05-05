import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Decimal } from '@prisma/client/catalog/runtime/library';
import { OptionGroup } from '../common/interfaces/catalog.interface';
import { ItemEntity } from './item.entity';

export class VariantEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sku: string;

  @ApiProperty({ type: Decimal, nullable: true })
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @Type(() => ItemEntity)
  parent: ItemEntity;

  @ApiProperty({ isArray: true, nullable: true })
  groups?: OptionGroup[];

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(partial: Partial<VariantEntity>) {
    Object.assign(this, partial);
  }
}
