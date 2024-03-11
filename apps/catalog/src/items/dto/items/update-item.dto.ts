import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client/catalog';
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
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  sku: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ default: Status.PENDING })
  @IsOptional()
  @IsString()
  status?: Status;

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
  @IsArray()
  variants?: Array<{
    id: string;
    sku: string;
    price: number;
    quantity: number;
  }>;

  constructor(partial: Partial<UpdateItemDto>) {
    Object.assign(this, partial);
  }
}
