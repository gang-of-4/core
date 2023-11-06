import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../../users/services/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from '../../roles/entities/role.entity';
import { instanceToPlain } from 'class-transformer';
import { JwtTokenDto } from '../dto/jwt-token.dto';
import { UserRegisterDto } from '../dto/user-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    userRegisterDto: UserRegisterDto,
    role: RoleEntity,
  ): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.create({
        data: {
          firstName: userRegisterDto.firstName,
          lastName: userRegisterDto.lastName,
          email: userRegisterDto.email,
          phone: userRegisterDto?.phone,
          role: {
            connect: {
              id: role.id,
            },
          },
          credentials: {
            create: {
              password: await bcrypt.hash(userRegisterDto.password, 10),
            },
          },
        },
      }),
    );
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
        userId: user.id,
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
