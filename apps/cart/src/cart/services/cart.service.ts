import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CartEntity } from '../entities/cart.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '../exceptions/not-found.exception';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';
import { ItemsService } from './items.service';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import { CheckoutCartDto } from '../dto/checkout-cart-dto';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private itemsService: ItemsService,
  ) {}

  private async getCartAndCartItems(cart: CartEntity): Promise<CartEntity> {
    const cartItems = [];

    await Promise.all(
      cart.cartItems.map(async (cartItem) => {
        const item = await this.itemsService.getItem(cartItem.itemId);
        if (item.quantity < cartItem.quantity) {
          throw new NotFoundException();
        }
        cartItems.push({
          id: cartItem.id,
          quantity: cartItem.quantity,
          item: item,
        });
      }),
    );

    return new CartEntity({
      ...cart,
      cartItems: cartItems,
    });
  }

  async getExistingOrCreate(userId: string): Promise<CartEntity> {
    const existingCart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        cartItems: true,
        address: true,
      },
    });

    if (existingCart) {
      return await this.getCartAndCartItems(new CartEntity(existingCart));
    } else {
      const cart = await this.prisma.cart.create({
        data: {
          userId,
          paymentMethodId: null,
        },
      });

      return new CartEntity({
        ...cart,
      });
    }
  }

  async findAll(role: string): Promise<CartEntity[]> {
    if (role !== 'admin') {
      throw new UnauthorizedException();
    }
    const carts = await this.prisma.cart.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        cartItems: true,
        address: true,
      },
    });

    return carts.map((cart) => new CartEntity(cart));
  }

  async findOneOrFail(id: string): Promise<CartEntity> {
    const cart = await this.prisma.cart
      .findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          cartItems: true,
          address: true,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    return await this.getCartAndCartItems(new CartEntity(cart));
  }

  async addCartItem(
    cartId: string,
    createCartItemDto: CreateCartItemDto,
    userId: string,
  ): Promise<CartEntity> {
    const existingCart = await this.prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });

    if (!existingCart) {
      throw new NotFoundException();
    }

    if (existingCart.userId !== userId) {
      throw new UnauthorizedException();
    }

    const isAvailable = await this.itemsService.checkItemAvailability(
      createCartItemDto.itemId,
      createCartItemDto.quantity,
    );

    if (!isAvailable) {
      throw new NotFoundException();
    }

    const existingCartItem = await this.prisma.cartItem.findFirst({
      where: {
        itemId: createCartItemDto.itemId,
        cartId,
      },
    });

    if (existingCartItem) {
      const updatedCart = await this.prisma.cart.update({
        where: { id: cartId },
        data: {
          cartItems: {
            update: {
              where: { id: existingCartItem.id },
              data: {
                quantity: {
                  increment: createCartItemDto.quantity,
                },
              },
            },
          },
        },
        include: {
          cartItems: true,
          address: true,
        },
      });
      return await this.getCartAndCartItems(new CartEntity(updatedCart));
    } else {
      const updatedCart = await this.prisma.cart.update({
        where: { id: cartId },
        data: {
          cartItems: {
            create: {
              itemId: createCartItemDto.itemId,
              quantity: createCartItemDto.quantity,
            },
          },
        },
        include: {
          cartItems: true,
          address: true,
        },
      });
      return await this.getCartAndCartItems(new CartEntity(updatedCart));
    }
  }

  async updateCartItem(
    cartId: string,
    cartItemId: string,
    updateCartItemDto: UpdateCartItemDto,
    userId: string,
  ): Promise<CartEntity> {
    const cart = await this.prisma.cart
      .findUniqueOrThrow({
        where: {
          id: cartId,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    if (cart.userId !== userId) {
      throw new UnauthorizedException();
    }

    const updatedCart = await this.prisma.cart.update({
      where: { id: cartId },
      data: {
        cartItems: {
          update: {
            where: { id: cartItemId },
            data: {
              quantity: updateCartItemDto.quantity,
            },
          },
        },
      },
      include: {
        cartItems: true,
        address: true,
      },
    });

    return await this.getCartAndCartItems(new CartEntity(updatedCart));
  }

  async deleteCartItem(
    cartId: string,
    cartItemId: string,
    userId: string,
    role: string,
  ): Promise<CartEntity> {
    const existingCart = await this.prisma.cart
      .findUniqueOrThrow({
        where: {
          id: cartId,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    if (existingCart.userId !== userId && role !== 'admin') {
      throw new UnauthorizedException();
    }

    const updatedCart = await this.prisma.cart.update({
      where: { id: cartId },
      data: {
        cartItems: {
          delete: {
            id: cartItemId,
          },
        },
      },
      include: {
        cartItems: true,
        address: true,
      },
    });

    return await this.getCartAndCartItems(new CartEntity(updatedCart));
  }

  async checkout(
    cartId: string,
    checkoutCartDto: CheckoutCartDto,
    userId: string,
  ): Promise<CartEntity> {
    const existingCart = await this.prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        address: {
          create: {
            ...checkoutCartDto.address,
          },
        },
        paymentMethodId: checkoutCartDto.paymentMethodId,
      },
      include: {
        cartItems: true,
        address: true,
      },
    });

    if (!existingCart) {
      throw new NotFoundException();
    }

    if (existingCart.userId !== userId) {
      throw new UnauthorizedException();
    }

    await Promise.all(
      existingCart.cartItems.map(async (cartItem) => {
        const isAvailable = await this.itemsService.checkItemAvailability(
          cartItem.itemId,
          cartItem.quantity,
        );
        if (!isAvailable) {
          throw new NotFoundException();
        }
      }),
    );

    await this.itemsService.reserveItems(existingCart.cartItems);

    await this.createOrder(existingCart);

    return await this.clearCart(cartId);
  }

  private async clearCart(cartId: string): Promise<CartEntity> {
    const cart = await this.prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        cartItems: {
          deleteMany: {},
        },
        address: {
          delete: true,
        },
        paymentMethodId: null,
      },
    });

    return new CartEntity(cart);
  }

  private async createOrder(cart: CartEntity) {
    // @TODO-Albaraa: Create order
    console.log('Creating order for cart:', cart);
  }
}
