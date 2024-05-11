import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { Image } from '@prisma/client/orders';

export class ImageEntity implements Image {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  @Type(() => Number)
  size: bigint;

  @Exclude()
  itemId: string;

  constructor(partial: Partial<ImageEntity>) {
    Object.assign(this, partial);
  }
}
