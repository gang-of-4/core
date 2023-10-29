import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerAuthController } from './customer-auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [CustomerAuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
