import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AuthorizeDto {
  @ApiProperty()
  @IsDefined()
  access_token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uri: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  method: string;

  constructor(partial: Partial<AuthorizeDto>) {
    Object.assign(this, partial);
  }
}
