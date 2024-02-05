import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;

  constructor(partial: Partial<AuthenticationDto>) {
    Object.assign(this, partial);
  }
}
