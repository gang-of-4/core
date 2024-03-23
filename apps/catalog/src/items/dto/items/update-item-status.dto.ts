import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client/catalog';
import { IsString } from 'class-validator';

export class UpdateItemStatusDto {
  @ApiProperty()
  @IsString()
  status: Status;

  constructor(partial: Partial<UpdateItemStatusDto>) {
    Object.assign(this, partial);
  }
}
