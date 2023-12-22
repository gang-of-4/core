import { Role } from '@prisma/client/accounts';
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
import { IsEmailUnique } from '../rules/is-unique';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'example@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsEmailUnique()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsUUID()
  @RoleExists()
  roleId: Role['id'];

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
