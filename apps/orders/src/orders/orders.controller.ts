import { Controller, Delete, Get, Headers, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtService } from '@nestjs/jwt';

@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async findAll(@Headers('Authorization') authorization: string) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.ordersService.findAll(token?.user?.role?.name);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.ordersService.findOneOrFail(id, token?.user?.role?.name);
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.ordersService.updateOrderStatus(
      id,
      token?.user?.role?.name,
    );
  }

  @Patch(':id/items/:itemId/status')
  async updateOrderItemStatus(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Headers('Authorization') authorization: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.ordersService.updateOrderItemStatus(
      id,
      itemId,
      token?.user?.role?.name,
    );
  }

  @Delete(':id')
  async cancelOrder(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.ordersService.cancelOrder(id, token?.user?.role?.name);
  }
}
