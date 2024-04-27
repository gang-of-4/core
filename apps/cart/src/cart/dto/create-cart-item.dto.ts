import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsBoolean()
  isVariant: boolean = false;

  constructor(partial: Partial<CreateCartItemDto>) {
    Object.assign(this, partial);
  }
}
