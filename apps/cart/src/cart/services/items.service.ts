import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CartItemEntity } from '../entities/cartItem.entity';

@Injectable()
export class ItemsService {
  constructor(private configService: ConfigService) {}

  // @TODO-Albaraa: This method needs to be implemented using gRPC
  async getItem(id: string): Promise<any> {
    const item = await fetch(
      this.configService.get('CATALOG_API_URL') + `/items/${id}`,
    );
    return await item.json();
  }

  // @TODO-Albaraa: This method needs to be implemented using gRPC
  async checkItemAvailability(
    itemId: string,
    quantity: number,
  ): Promise<boolean> {
    const item = await this.getItem(itemId);
    return item.quantity >= quantity;
  }

  // @TODO-Albaraa: This method needs to be implemented using gRPC
  async reserveItems(cartItems: CartItemEntity[]): Promise<boolean> {
    console.log('Reserving cartItems:', cartItems);
    return true;
  }
}
