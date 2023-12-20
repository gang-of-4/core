import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client/accounts';
import { Expose } from 'class-transformer';

export class RoleEntity implements Role {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Expose({ groups: ['roles.create', 'roles.update', 'roles.delete'] })
  createdAt: Date;

  @ApiProperty()
  @Expose({ groups: ['roles.create', 'roles.update', 'roles.delete'] })
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['roles.create', 'roles.update', 'roles.delete'] })
  deletedAt: Date;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
