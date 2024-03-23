import { ApiProperty } from '@nestjs/swagger';
import { OptionGroup } from '@prisma/client/catalog';
import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateOptionDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  label: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  value: string;

  @ApiProperty()
  @IsUUID()
  @IsString()
  group_id: OptionGroup['id'];

  constructor(partial: Partial<CreateOptionDto>) {
    Object.assign(this, partial);
  }
}
