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

describe('CustomerAuthController', () => {
  let controller: CustomerAuthController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
