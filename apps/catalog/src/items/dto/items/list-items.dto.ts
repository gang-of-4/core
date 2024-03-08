import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ListItemsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUUID()
  store_id?: string;

  constructor(partial: Partial<ListItemsDto>) {
    Object.assign(this, partial);
  }
}
