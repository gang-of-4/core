import { ApiProperty } from '@nestjs/swagger';
import { Media } from '@prisma/client/media';
import { Exclude, Expose, Type } from 'class-transformer';

export class MediaEntity implements Media {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @Exclude()
  ownerId: string;

  @Exclude()
  extension: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  @Type(() => Number)
  size: bigint;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['media.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<MediaEntity>) {
    Object.assign(this, partial);
  }
}
