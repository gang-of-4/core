import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  itemId: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  constructor(partial: Partial<CreateCartItemDto>) {
    Object.assign(this, partial);
  }
}
