import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAuthController } from '../controllers/customer-auth.controller';
import { AuthService } from '../services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';
import { RolesModule } from '../../roles/roles.module';
import { UsersModule } from '../../users/users.module';
import { AdminAuthController } from '../controllers/admin-auth.controller';
import { VendorAuthController } from '../controllers/vendor-auth.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UserLoginDto } from '../dto/user-login.dto';
import { JwtTokenDto } from '../dto/jwt-token.dto';

describe('AdminAuthController', () => {
  let controller: AdminAuthController;
  let prisma: PrismaService;
  let defaultUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        UsersModule,
        RolesModule,
        PassportModule,
        JwtModule.register({
          secret: 'secretKey',
          signOptions: { expiresIn: '48h' },
        }),
      ],
      controllers: [
        CustomerAuthController,
        VendorAuthController,
        AdminAuthController,
      ],
      providers: [AuthService],
    }).compile();

    controller = module.get<AdminAuthController>(AdminAuthController);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.$connect();

    defaultUser = await prisma.user.findFirst({
      where: {
        role: {
          name: 'admin',
        },
      },
      select: {
        email: true,
        credentials: {
          select: {
            password: true,
          },
        },
      },
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('prisma should be defined', async () => {
    expect(prisma).toBeDefined();
  });

  it('should login a vendor', async () => {
    const loginData = plainToInstance(UserLoginDto, {
      email: defaultUser.email,
      password: 'Q1W2E3R4',
    });
    await validateOrReject(loginData);

    const token = await controller.login(loginData);

    expect(token).toBeInstanceOf(JwtTokenDto);
    expect(token.access_token).toBeDefined();
    expect(token.access_token).not.toBeNull();
  });
});
