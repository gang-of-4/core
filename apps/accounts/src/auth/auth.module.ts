import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerAuthController } from './customer-auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { VendorAuthController } from './vendor-auth.controller';
import { AdminAuthController } from './admin-auth.controller';

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
