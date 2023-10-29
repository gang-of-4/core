import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Expose } from 'class-transformer';

export class RoleEntity implements Role {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Expose({ groups: ['roles.create', 'roles.update', 'roles.delete'] })
  created_at: Date;

  @ApiProperty()
  @Expose({ groups: ['roles.create', 'roles.update', 'roles.delete'] })
  updated_at: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['roles.create', 'roles.update', 'roles.delete'] })
  deleted_at: Date;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
