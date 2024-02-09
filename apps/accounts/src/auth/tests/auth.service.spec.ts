import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../prisma/prisma.module';
import { RolesModule } from '../../roles/roles.module';
import { UsersModule } from '../../users/users.module';
import { AdminAuthController } from '../controllers/admin.controller';
import { CustomerAuthController } from '../controllers/customer.controller';
import { VendorAuthController } from '../controllers/vendor.controller';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

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

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.$connect();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('prisma should be defined', async () => {
    expect(prisma).toBeDefined();
  });
});
