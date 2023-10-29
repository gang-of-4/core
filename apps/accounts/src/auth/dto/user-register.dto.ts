import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IsEqualTo } from '../rules/is-equal-to';

export class UserRegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'example@example.com' })
  @IsNotEmpty()
  @IsEmail({ allow_ip_domain: false })
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEqualTo(UserRegisterDto, (request) => request.password)
  password_confirmation: string;
}
