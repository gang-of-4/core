import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class QuantityRequestDto {
  @ApiProperty()
  @IsArray()
  @ArrayUnique()
  items: EntityQuantityDto[];

  @ApiProperty()
  @IsArray()
  @ArrayUnique()
  variants: EntityQuantityDto[];

  constructor(partial: Partial<QuantityRequestDto>) {
    Object.assign(this, partial);
  }
}

class EntityQuantityDto {
  @ApiProperty()
  @IsString()
  @IsUUID(4)
  id: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;

  constructor(partial: Partial<EntityQuantityDto>) {
    Object.assign(this, partial);
  }
}
