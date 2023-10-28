import { Role } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsDefined,
  IsUUID,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { RoleExists } from '../rules/role-exist.rule';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsUUID()
  @RoleExists()
  role_id: Role['id'];
}
