import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client/accounts';
import { Expose, Type } from 'class-transformer';
import { RoleEntity } from './role.entity';
import { ActivityEntity } from './activity.entity';

export class PermissionEntity implements Permission {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Expose({
    groups: ['permissions.create', 'permissions.update', 'permissions.delete'],
  })
  createdAt: Date;

  @ApiProperty()
  @Expose({
    groups: ['permissions.create', 'permissions.update', 'permissions.delete'],
  })
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({
    groups: ['permissions.create', 'permissions.update', 'permissions.delete'],
  })
  deletedAt: Date;

  @ApiProperty({ type: RoleEntity })
  @Type(() => RoleEntity)
  role: RoleEntity;

  @ApiProperty({ type: ActivityEntity, isArray: true, default: [] })
  @Type(() => ActivityEntity)
  @Expose({
    groups: ['permissions.create', 'permissions.update', 'permissions.delete'],
  })
  activities: ActivityEntity[];

  constructor(partial: Partial<PermissionEntity>) {
    Object.assign(this, partial);
  }
}
