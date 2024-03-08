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
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string = '';

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

  variants?;

  @ApiProperty()
  @IsString()
  @IsUUID()
  store_id: string;

  constructor(partial: Partial<UpdateItemDto>) {
    Object.assign(this, partial);
  }
}
