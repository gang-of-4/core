import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity';

export class JwtTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  sub: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: UserEntity;

  @ApiProperty()
  @IsNumber()
  iat: number;

  @ApiProperty()
  @IsNumber()
  exp: number;

  constructor(partial: string | Partial<JwtTokenDto>) {
    Object.assign(this, partial);
  }
}
