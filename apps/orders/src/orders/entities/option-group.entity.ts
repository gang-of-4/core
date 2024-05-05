import { ApiProperty } from '@nestjs/swagger';
import { OptionGroup, OptionType } from '@prisma/client/orders';
import { Exclude, Expose, Type } from 'class-transformer';
import { OptionEntity } from './option.entity';

export class OptionGroupEntity implements OptionGroup {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: OptionType;

  @ApiProperty()
  @Exclude()
  order: number;

  @ApiProperty({ type: OptionEntity, isArray: true, nullable: true })
  @Type(() => OptionEntity)
  options?: OptionEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['option-group.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<OptionGroupEntity>) {
    Object.assign(this, partial);
  }
}
