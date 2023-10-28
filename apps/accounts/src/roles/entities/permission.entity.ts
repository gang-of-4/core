import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';

export class PermissionEntity implements Permission {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ nullable: true, default: null })
  deleted_at: Date;

  constructor(partial: Partial<PermissionEntity>) {
    Object.assign(this, partial);
  }
}
