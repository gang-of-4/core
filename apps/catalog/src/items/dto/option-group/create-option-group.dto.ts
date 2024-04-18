import { ApiProperty } from '@nestjs/swagger';
import { OptionType } from '@prisma/client/catalog';
import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateOptionGroupDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty()
  @IsString()
  @IsIn(['TEXT', 'COLOR'])
  @IsNotEmpty()
  type: OptionType;

  constructor(partial: Partial<CreateOptionGroupDto>) {
    Object.assign(this, partial);
  }
}
