import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { OrderStatus } from '@prisma/client/orders';

export class UpdateOrderStatusDto {
  @ApiProperty()
  @IsString()
  status: OrderStatus;

  constructor(partial: Partial<UpdateOrderStatusDto>) {
    Object.assign(this, partial);
  }
}
