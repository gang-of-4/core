import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client/stores';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vendorId: string;

  @ApiProperty({ default: Status.PENDING })
  @IsOptional()
  status: Status;

  constructor(partial: Partial<CreateStoreDto>) {
    Object.assign(this, partial);
  }
}
