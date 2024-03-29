import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CustomerAuthController } from './controllers/customer.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { VendorAuthController } from './controllers/vendor.controller';
import { AdminAuthController } from './controllers/admin.controller';
import { AuthorizationController } from './controllers/authorization.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    RolesModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '48h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AuthorizationController,
    CustomerAuthController,
    VendorAuthController,
    AdminAuthController,
  ],
  providers: [AuthService],
})
export class AuthModule {}
