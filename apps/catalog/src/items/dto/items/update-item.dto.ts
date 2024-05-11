import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CategoryExists } from '../../../categories/rules/category-exist.rule';
import { Type } from 'class-transformer';

export class UpdateItemDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  sku: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  slug?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID(4, { each: true })
  @IsString({ each: true })
  @CategoryExists({ each: true })
  categories?: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID(4, { each: true })
  @IsString({ each: true })
  options?: string[];

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateVariantDto)
  variants?: UpdateVariantDto[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID(4, { each: true })
  @IsString({ each: true })
  images?: string[];

  constructor(partial: Partial<UpdateItemDto>) {
    Object.assign(this, partial);
  }
}

class UpdateVariantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  constructor(partial: Partial<UpdateVariantDto>) {
    Object.assign(this, partial);
  }
}
