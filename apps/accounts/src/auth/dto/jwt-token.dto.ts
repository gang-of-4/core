import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JwtTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;

  constructor(partial: Partial<JwtTokenDto>) {
    Object.assign(this, partial);
  }
}
