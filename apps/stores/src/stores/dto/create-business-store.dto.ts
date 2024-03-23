import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBusinessStoreDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  vendorId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUUID()
  logo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vatNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  crNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerNationalId: string;

  constructor(partial: Partial<CreateBusinessStoreDto>) {
    Object.assign(this, partial);
  }
}
