import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AuthorizeDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  uri: string;

  @ApiProperty()
  method: string;

  constructor(partial: Partial<AuthorizeDto>) {
    Object.assign(this, partial);
  }
}
