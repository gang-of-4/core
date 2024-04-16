import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Headers,
  Body,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import { CheckoutCartDto } from '../dto/checkout-cart-dto';

@Controller({
  path: 'cart',
  version: '1',
})
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Headers('Authorization') authorization: string) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.cartService.getExistingOrCreate(token?.user?.id);
  }

  @Get()
  async findAll(@Headers('Authorization') authorization: string) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.cartService.findAll(token?.user?.role?.name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cartService.findOneOrFail(id);
  }

  @Post(':id/items')
  async addCartItem(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
    @Body() createItemDto: CreateCartItemDto,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.cartService.addCartItem(
      id,
      createItemDto,
      token?.user?.id,
    );
  }

  @Patch(':id/items/:itemId')
  async updateCartItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Headers('Authorization') authorization: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.cartService.updateCartItem(
      id,
      itemId,
      updateCartItemDto,
      token?.user?.id,
    );
  }

  @Delete(':id/items/:itemId')
  async removeCartItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Headers('Authorization') authorization: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.cartService.removeCartItem(
      id,
      itemId,
      token?.user?.id,
      token?.user?.role?.name,
    );
  }

  @Post(':id/checkout')
  async checkout(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
    @Body() checkoutCartDto: CheckoutCartDto,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.cartService.checkout(
      id,
      checkoutCartDto,
      token?.user?.id,
    );
  }
}
