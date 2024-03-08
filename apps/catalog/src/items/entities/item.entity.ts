import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Item } from '@prisma/client/catalog';
import { Expose, Type } from 'class-transformer';
import { Decimal } from '@prisma/client/catalog/runtime/library';
import { CategoryEntity } from './category.entity';
import { OptionGroupEntity } from './option-group.entity';

export class ItemEntity implements Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: Decimal })
  @Type(() => String)
  price: Decimal;

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
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: CategoryEntity, isArray: true, nullable: true })
  categories?: CategoryEntity[];

  @ApiProperty({ type: OptionGroupEntity, isArray: true, nullable: true })
  groups?: OptionGroupEntity[];

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['item.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }
}
