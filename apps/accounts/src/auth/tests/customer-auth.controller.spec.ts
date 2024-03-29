import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAuthController } from '../controllers/customer.controller';
import { AuthService } from '../services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';
import { RolesModule } from '../../roles/roles.module';
import { UsersModule } from '../../users/users.module';
import { AdminAuthController } from '../controllers/admin.controller';
import { VendorAuthController } from '../controllers/vendor.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserRegisterDto } from '../dto/user-register.dto';
import { validateOrReject } from 'class-validator';
import { AuthenticationDto } from '../dto/authentication.dto';

describe('CustomerAuthController', () => {
  let controller: CustomerAuthController;
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

    controller = module.get<CustomerAuthController>(CustomerAuthController);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.$connect();

    defaultUser = {
      firstName: 'example',
      lastName: 'example',
      email: 'customer@controller.com',
      phone: '+966500000004',
      password: '12345678QWErty@#',
      passwordConfirmation: '12345678QWErty@#',
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(async () => {
    await prisma.credentialsAccount.deleteMany({
      where: {
        user: {
          email: defaultUser.email,
        },
      },
    });
    await prisma.user.deleteMany({
      where: {
        email: defaultUser.email,
      },
    });
    await prisma.$disconnect();
  });

  it('prisma should be defined', async () => {
    expect(prisma).toBeDefined();
  });

  it('should signup a customer', async () => {
    const userData = plainToInstance(UserRegisterDto, defaultUser);
    await validateOrReject(userData);
    const user = await controller.register(userData);

    expect(user).toBeInstanceOf(Object);
    expect(user.email).toEqual(defaultUser.email);
    expect(user.firstName).toEqual(defaultUser.firstName);
    expect(user.lastName).toEqual(defaultUser.lastName);
    expect(user.phone).toEqual(defaultUser.phone);
    expect(user.roleId).toEqual(
      (
        await prisma.role.findFirst({
          where: { name: 'customer' },
          select: { id: true },
        })
      ).id,
    );
  });

  it('should login a customer', async () => {
    const userData = plainToInstance(UserRegisterDto, defaultUser);
    await validateOrReject(userData);

    await controller.register(userData);
    const token = await controller.login(userData);

    expect(token).toBeInstanceOf(AuthenticationDto);
    expect(token.access_token).toBeDefined();
    expect(token.access_token).not.toBeNull();
  });
});
