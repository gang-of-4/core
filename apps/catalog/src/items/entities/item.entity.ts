import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Item } from '@prisma/client/catalog';
import { Expose, Transform, Type } from 'class-transformer';
import { Decimal } from '@prisma/client/catalog/runtime/library';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { OptionGroupEntity } from './option-group.entity';
import { VariantEntity } from './variant.entity';
import { MediaEntity } from './media.entity';

export class ItemEntity implements Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: Decimal })
  @Transform(({ value }) => value?.toNumber())
  @Type(() => Number)
  price: Decimal;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @Type(() => MediaEntity)
  images: MediaEntity[];

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  status: $Enums.Status;

  @ApiProperty()
  order: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  @Type(() => String)
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;

  @ApiProperty()
  @Type(() => String)
  @Transform(({ value }) => value.toISOString())
  updatedAt: Date;

  @ApiProperty({ type: CategoryEntity, isArray: true, nullable: true })
  @Type(() => CategoryEntity)
  categories?: CategoryEntity[];

  @ApiProperty({ type: OptionGroupEntity, isArray: true, nullable: true })
  @Type(() => OptionGroupEntity)
  groups?: OptionGroupEntity[];

  @ApiProperty({ type: VariantEntity, isArray: true, nullable: true })
  @Type(() => VariantEntity)
  variants?: VariantEntity[];

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['item.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }
}
