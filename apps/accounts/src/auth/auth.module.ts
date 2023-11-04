import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CustomerAuthController } from './controllers/customer-auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { VendorAuthController } from './controllers/vendor-auth.controller';
import { AdminAuthController } from './controllers/admin-auth.controller';

@Module({
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
})
export class AuthModule {}
