import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/accounts-client';
import { Expose, Type } from 'class-transformer';
import { RoleEntity } from './role.entity';

export class PermissionEntity implements Permission {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Expose({
    groups: ['permissions.create', 'permissions.update', 'permissions.delete'],
  })
  created_at: Date;

  @ApiProperty()
  @Expose({
    groups: ['permissions.create', 'permissions.update', 'permissions.delete'],
  })
  updated_at: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({
    groups: ['permissions.create', 'permissions.update', 'permissions.delete'],
  })
  deleted_at: Date;

  @ApiProperty({ type: RoleEntity })
  @Type(() => RoleEntity)
  role: RoleEntity;

  constructor(partial: Partial<PermissionEntity>) {
    Object.assign(this, partial);
  }
}
