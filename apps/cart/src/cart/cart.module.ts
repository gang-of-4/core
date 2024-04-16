import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ItemsService } from './services/items.service';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [CartController],
  providers: [CartService, ItemsService],
})
export class CartModule {}
