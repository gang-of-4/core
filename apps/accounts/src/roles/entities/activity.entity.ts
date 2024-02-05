import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '@prisma/client/accounts';
import { Expose } from 'class-transformer';

export class ActivityEntity implements Activity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  method: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  @Expose({ groups: ['roles.create', 'roles.update', 'roles.delete'] })
  createdAt: Date;

  @ApiProperty()
  @Expose({ groups: ['roles.create', 'roles.update', 'roles.delete'] })
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['roles.create', 'roles.update', 'roles.delete'] })
  deletedAt: Date;

  constructor(partial: Partial<ActivityEntity>) {
    Object.assign(this, partial);
  }
}
