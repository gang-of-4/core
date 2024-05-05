import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { UpdateOrderItemStatusDto } from '../dto/update-orderitem-status.dto';

@Controller({
  version: '1',
  path: 'orders',
})
export class OrdersController {
  constructor(
    private jwtService: JwtService,
    private ordersService: OrdersService,
  ) {}

  @Get()
  async findAll(
    @Headers('Authorization') authorization: string,
    @Query('storeId') storeId: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.ordersService.findAll(
      token?.user.role.name,
      token?.user.id,
      storeId,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string | number,
    @Query('storeId') storeId: string,
    @Headers('Authorization') authorization: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.ordersService.findOneOrFail(
      id,
      token?.user.role.name,
      token?.user.id,
      storeId,
    );
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Query('storeId') storeId: string,
    @Headers('Authorization') authorization: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.ordersService.updateOrderStatus(
      updateOrderStatusDto.status,
      id,
      token?.user.role.name,
      token?.user.id,
      storeId,
    );
  }

  @Patch(':id/items/:itemId/status')
  async updateOrderItemStatus(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Query('storeId') storeId: string,
    @Headers('Authorization') authorization: string,
    @Body() updateOrderItemStatusDto: UpdateOrderItemStatusDto,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.ordersService.updateOrderItemStatus(
      updateOrderItemStatusDto.status,
      itemId,
      id,
      token?.user?.role?.name,
      token?.user.id,
      storeId,
    );
  }

  @Delete(':id')
  async cancelOrder(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const token = this.jwtService.decode(authorization?.split(' ')[1]) as any;
    return await this.ordersService.cancelOrder(
      id,
      token?.user?.role?.name,
      token?.user.id,
    );
  }
}
