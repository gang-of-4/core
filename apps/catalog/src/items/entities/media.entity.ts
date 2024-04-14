import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

export class MediaEntity {
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

  constructor(partial: Partial<MediaEntity>) {
    Object.assign(this, partial);
  }
}
