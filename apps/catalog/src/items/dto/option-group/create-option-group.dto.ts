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
// b5133e06-f1fb-4453-9b81-bad2e02d3b1e
// 47c4b08d-3d36-46cf-b700-c33c6def26df
// ecd42baa-74f0-463c-8019-caea3961e538
