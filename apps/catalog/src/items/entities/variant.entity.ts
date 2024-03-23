import { ApiProperty } from '@nestjs/swagger';
import { Variant } from '@prisma/client/catalog';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Decimal } from '@prisma/client/catalog/runtime/library';
import { OptionGroupEntity } from './option-group.entity';
import { ItemEntity } from './item.entity';

export class VariantEntity implements Variant {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: Decimal })
  @Transform(({ value }) => value?.toNumber())
  @Type(() => Number)
  price: Decimal;

  @Exclude()
  parentId: string;

  @ApiProperty()
  @Type(() => ItemEntity)
  parent?: ItemEntity;

  @ApiProperty({ type: OptionGroupEntity, isArray: true, nullable: true })
  @Type(() => OptionGroupEntity)
  groups?: OptionGroupEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['item.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<VariantEntity>) {
    Object.assign(this, partial);
  }
}
