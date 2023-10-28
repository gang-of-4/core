import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  deleted_at: Date;
}
