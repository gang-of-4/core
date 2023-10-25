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

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsDefined()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsUUID()
  @RoleExists()
  role_id: Role['id'];
}
