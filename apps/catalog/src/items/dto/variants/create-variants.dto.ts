import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateVariantsDto {
  @ApiProperty()
  @IsArray()
  @IsArray({ each: true })
  options?: string[];

  constructor(partial: Partial<CreateVariantsDto>) {
    Object.assign(this, partial);
  }
}
