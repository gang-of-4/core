import { ApiProperty } from '@nestjs/swagger';
import { Option } from '@prisma/client/orders';
import { Exclude, Expose, Type } from 'class-transformer';
import { OptionGroupEntity } from './option-group.entity';

export class OptionEntity implements Option {
  @ApiProperty()
  id: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  value: string;

  @ApiProperty({ type: OptionGroupEntity })
  @Type(() => OptionGroupEntity)
  group?: OptionGroupEntity;

  @Exclude()
  group_id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['option.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<OptionEntity>) {
    Object.assign(this, partial);
  }
}
