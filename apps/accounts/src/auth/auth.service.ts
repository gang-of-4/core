import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { instanceToPlain } from 'class-transformer';
import { JwtTokenDto } from './dto/jwt-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    userRegisterDto: UserLoginDto,
    role: RoleEntity,
  ): Promise<UserEntity> {
    const user = await this.usersService.create(
      new CreateUserDto({
        ...userRegisterDto,
        role_id: role.id,
      }),
    );

    await this.prisma.credentialsAccount.create({
      data: {
        password: await bcrypt.hash(userRegisterDto.password, 10),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return user;
  }

  login(user: UserEntity): JwtTokenDto {
    const payload = {
      sub: user.id,
      user: instanceToPlain(user),
    };
    return new JwtTokenDto({
      access_token: this.jwtService.sign(payload),
    });
  }

  async validateUserCredentials(
    userLoginDto: UserLoginDto,
  ): Promise<UserEntity> {
    const user = await this.usersService.findOneByEmail(userLoginDto.email);

    if (!user) {
      throw BadRequestException;
    }

    const credentials = await this.prisma.credentialsAccount.findUnique({
      where: {
        user_id: user.id,
      },
    });

    if (!credentials) {
      throw BadRequestException;
    }

    if (!(await bcrypt.compare(userLoginDto.password, credentials.password))) {
      throw UnauthorizedException;
    } else {
      return user;
    }
  }
}
