import { ApiProperty } from '@nestjs/swagger';
import { Cateogry } from '@prisma/client/catalog';
import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { CategoryExists } from '../rules/category-exist.rule';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  logo?: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  banner?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string = '';

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  @CategoryExists()
  parent_id?: Cateogry['id'];

  constructor(partial: Partial<CreateCategoryDto>) {
    Object.assign(this, partial);
  }
}
