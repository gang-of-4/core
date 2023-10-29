import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/accounts-client';
import { Exclude, Expose, Type } from 'class-transformer';
import { RoleEntity } from '../../roles/entities/role.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @ApiProperty({ required: false })
  phone: string;

  @Exclude()
  role_id: Role['id'];

  @ApiProperty({ nullable: true, default: null })
  email_verified_at: Date;

  @ApiProperty({ type: RoleEntity })
  @Type(() => RoleEntity)
  role: RoleEntity;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ nullable: true, default: null })
  @Expose({ groups: ['users.delete', 'self'] })
  deleted_at: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
