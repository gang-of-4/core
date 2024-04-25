import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ItemImage } from '@prisma/client/orders';

export class ItemImageEntity implements ItemImage {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @Exclude()
  ownerId: string;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  @Type(() => Number)
  size: bigint;

  @ApiProperty()
  @Type(() => String)
  createdAt: Date;

  @ApiProperty()
  @Type(() => String)
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['media.delete', 'self'] })
  deletedAt: Date;

  @Exclude()
  orderItemId: string;

  constructor(partial: Partial<ItemImageEntity>) {
    Object.assign(this, partial);
  }
}
