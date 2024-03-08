import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';
import { CategoryExists } from 'src/items/rules/category-exist.rule';

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
  @IsArray()
  variants?: Array<{
    id: string;
    sku: string;
    price: number;
    quantity: number;
  }>;

  @ApiProperty()
  @IsString()
  @IsUUID()
  store_id: string;

  constructor(partial: Partial<UpdateItemDto>) {
    Object.assign(this, partial);
  }
}
