import { ApiProperty } from '@nestjs/swagger';
import { Cateogry } from '@prisma/client/catalog';
import { Exclude, Expose, Type } from 'class-transformer';
import { ItemEntity } from './item.entity';

export class CategoryEntity implements Cateogry {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  banner: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  order: number;

  @Exclude()
  parentId: string;

  @ApiProperty({ type: CategoryEntity })
  @Type(() => CategoryEntity)
  parent?: CategoryEntity;

  @ApiProperty({ type: ItemEntity, isArray: true, nullable: true })
  items?: ItemEntity[];

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['category.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<CategoryEntity>) {
    Object.assign(this, partial);
  }
}
