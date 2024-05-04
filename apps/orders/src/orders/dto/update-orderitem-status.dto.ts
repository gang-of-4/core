import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ItemStatus } from '@prisma/client/orders';

export class UpdateOrderItemStatusDto {
  @ApiProperty()
  @IsString()
  status: ItemStatus;

  constructor(partial: Partial<UpdateOrderItemStatusDto>) {
    Object.assign(this, partial);
  }
}
