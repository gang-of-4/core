import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateCartItemDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;

  constructor(partial: Partial<UpdateCartItemDto>) {
    Object.assign(this, partial);
  }
}
