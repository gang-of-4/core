import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

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

  @ApiProperty({ type: String })
  role_id: Role['id'];

  @ApiProperty({ nullable: true, default: null })
  email_verified_at: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ nullable: true, default: null })
  deleted_at: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
