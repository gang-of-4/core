import { ApiProperty } from '@nestjs/swagger';
import { Cateogry } from '@prisma/client/catalog';
import { Exclude, Expose, Type } from 'class-transformer';

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
  logo: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  order: number;

  @Exclude()
  parentId: string;

  @ApiProperty({ type: CategoryEntity })
  @Type(() => CategoryEntity)
  parent: CategoryEntity;

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
