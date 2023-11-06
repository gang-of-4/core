import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { RoleEntity } from '../../roles/entities/role.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @ApiProperty({ required: false })
  phone: string;

  @Exclude()
  roleId: Role['id'];

  @ApiProperty({ nullable: true, default: null })
  emailVerifiedAt: Date;

  @ApiProperty({ type: RoleEntity })
  @Type(() => RoleEntity)
  role: RoleEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['users.delete', 'self'] })
  deletedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
