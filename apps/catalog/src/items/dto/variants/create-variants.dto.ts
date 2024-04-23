import { ApiProperty } from '@nestjs/swagger';
import { IsArray, MinLength } from 'class-validator';

export class CreateVariantsDto {
  @ApiProperty()
  @IsArray()
  @IsArray({ each: true })
  @MinLength(1)
  options: string[];

  constructor(partial: Partial<CreateVariantsDto>) {
    Object.assign(this, partial);
  }
}
