import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';
import { CategoryExists } from '../../../categories/rules/category-exist.rule';

export class CreateItemDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  sku?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
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
  @IsString()
  @IsUUID()
  store_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(['DRAFT', 'PENDING'])
  status?: string = 'DRAFT';

  constructor(partial: Partial<CreateItemDto>) {
    Object.assign(this, partial);
  }
}
