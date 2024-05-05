import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CartEntity } from '../entities/cart.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '../exceptions/not-found.exception';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import {
  CatalogService,
  ItemsService,
  VariantsService,
} from '../common/interfaces/catalog.interface';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { QuantityNotAvailableException } from '../exceptions/quantity-not-available.exception';
import { CartItemEntity } from '../entities/cartItem.entity';
import { CartCheckoutException } from '../exceptions/cart-checkout.exception';
import { CreateOrderDto } from '../dto/create-order.dto';
import { instanceToPlain } from 'class-transformer';
import { randomUUID } from 'crypto';
import { CheckoutCartDto } from '../dto/checkout-cart-dto';

@Injectable()
export class CartService {
  private catalogService: CatalogService;
  private itemsService: ItemsService;
  private variantsService: VariantsService;

  constructor(
    @Inject('CATALOG_PACKAGE') private client: ClientGrpc,
    private prisma: PrismaService,
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.catalogService =
      this.client.getService<CatalogService>('CatalogService');
    this.itemsService = this.client.getService<ItemsService>('ItemsService');
    this.variantsService =
      this.client.getService<VariantsService>('VariantsService');
    this.kafkaClient.subscribeToResponseOf('order.created');
  }

  async getExistingOrCreate(userId: string): Promise<CartEntity> {
    const cart = await this.findOneByUserId(userId);
    if (cart) {
      return cart;
    }
    return new CartEntity({
      ...(await this.prisma.cart.create({
        data: {
          userId,
        },
      })),
      isAvailable: false,
      address: null,
      cartItems: [],
    });
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
      },
    });

    return carts.map((cart) => new CartEntity(cart));
  }

  async findOneOrFail(id: string) {
    const cart = await this.prisma.cart
      .findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          cartItems: true,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    const cartItems = cart.cartItems.filter((cartItem) => !cartItem.isVariant);

    const cartVariants = cart.cartItems.filter(
      (cartItem) => cartItem.isVariant,
    );

    const availability = await lastValueFrom(
      this.catalogService.CheckAvailability({
        items: cartItems.map((cartItem) => ({
          id: cartItem.itemId,
          quantity: cartItem.quantity,
        })),
        variants: cartVariants.map((cartItem) => ({
          id: cartItem.itemId,
          quantity: cartItem.quantity,
        })),
      }),
    );

    const items = await lastValueFrom(
      this.itemsService.GetManyItems({
        ids: cartItems.map((cartItem) => cartItem.itemId),
      }),
    );

    const variants = await lastValueFrom(
      this.variantsService.GetManyVariants({
        ids: cartVariants.map((cartItem) => cartItem.itemId),
      }),
    );

    return new CartEntity({
      ...cart,
      isAvailable: availability.isAvailable,
      cartItems: cart.cartItems.map((cartItem) => {
        const entity = new CartItemEntity({
          ...cartItem,
        });
        if (cartItem.isVariant) {
          entity.variant = variants.payload.find(
            (variant) => variant.id === cartItem.itemId,
          );
          entity.isAvailable = availability.variants.find(
            (variant) => variant.id === cartItem.itemId,
          ).isAvailable;
        } else {
          entity.item = items.payload.find(
            (item) => item.id === cartItem.itemId,
          );
          entity.isAvailable = availability.items.find(
            (item) => item.id === cartItem.itemId,
          ).isAvailable;
        }
        return entity;
      }),
    });
  }

  async findOneByUserId(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true,
      },
    });

    if (!cart) {
      return null;
    }

    const cartItems = cart.cartItems.filter(
      (cartItem: { isVariant: any }) => !cartItem.isVariant,
    );

    const cartVariants = cart.cartItems.filter(
      (cartItem: { isVariant: any }) => cartItem.isVariant,
    );

    const availability = await lastValueFrom(
      this.catalogService.CheckAvailability({
        items: cartItems.map((cartItem: { itemId: any; quantity: any }) => ({
          id: cartItem.itemId,
          quantity: cartItem.quantity,
        })),
        variants: cartVariants.map(
          (cartItem: { itemId: any; quantity: any }) => ({
            id: cartItem.itemId,
            quantity: cartItem.quantity,
          }),
        ),
      }),
    );

    const items = await lastValueFrom(
      this.itemsService.GetManyItems({
        ids: cartItems.map((cartItem: { itemId: any }) => cartItem.itemId),
      }),
    );

    const variants = await lastValueFrom(
      this.variantsService.GetManyVariants({
        ids: cartVariants.map((cartItem: { itemId: any }) => cartItem.itemId),
      }),
    );

    return new CartEntity({
      ...cart,
      isAvailable: availability.isAvailable,
      cartItems: cart.cartItems.map((cartItem: Partial<CartItemEntity>) => {
        if (cartItem.isVariant) {
          const variant = variants.payload.find(
            (variant) => variant.id === cartItem.itemId,
          );
          const isAvailable = availability.variants.find(
            (variant) => variant.id === cartItem.itemId,
          ).isAvailable;
          return new CartItemEntity({
            ...cartItem,
            variant,
            isAvailable,
          });
        }
        const item = items.payload.find((item) => item.id === cartItem.itemId);
        const isAvailable = availability.items.find(
          (item) => item.id === cartItem.itemId,
        ).isAvailable;
        return new CartItemEntity({
          ...cartItem,
          item,
          isAvailable,
        });
      }),
    });
  }

  async addCartItem(
    cartId: string,
    createCartItemDto: CreateCartItemDto,
    userId: string,
  ) {
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

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        itemId_cartId: {
          itemId: createCartItemDto.id,
          cartId: cartId,
        },
      },
    });

    const key = createCartItemDto.isVariant ? 'variants' : 'items';

    const isAvailable = await lastValueFrom(
      this.catalogService.CheckAvailability({
        [key]: [
          {
            id: createCartItemDto.id,
            quantity: createCartItemDto.quantity + (cartItem?.quantity || 0),
          },
        ],
      }),
    );

    if (!isAvailable.isAvailable && isAvailable[key].length > 0) {
      throw new QuantityNotAvailableException();
    } else if (!isAvailable.isAvailable) {
      throw new NotFoundException();
    }

    await this.prisma.cartItem.upsert({
      where: {
        itemId_cartId: {
          itemId: createCartItemDto.id,
          cartId: cartId,
        },
      },
      update: {
        quantity: {
          increment: createCartItemDto.quantity,
        },
      },
      create: {
        quantity: createCartItemDto.quantity,
        itemId: createCartItemDto.id,
        isVariant: createCartItemDto.isVariant,
        cart: {
          connect: {
            id: cartId,
          },
        },
      },
    });

    return await this.findOneOrFail(cart.id);
  }

  async updateCartItem(
    cartId: string,
    cartItemId: string,
    updateCartItemDto: UpdateCartItemDto,
    userId: string,
  ) {
    await this.prisma.cart
      .findUniqueOrThrow({
        where: {
          id: cartId,
          userId: userId,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    const cartItem = await this.prisma.cartItem
      .findUniqueOrThrow({
        where: {
          id: cartItemId,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    const key = cartItem.isVariant ? 'variants' : 'items';

    const isAvailable = await lastValueFrom(
      this.catalogService.CheckAvailability({
        [key]: [
          {
            id: cartItem.itemId,
            quantity: updateCartItemDto.quantity,
          },
        ],
      }),
    );

    if (!isAvailable.isAvailable && isAvailable[key].length > 0) {
      throw new QuantityNotAvailableException();
    } else if (!isAvailable.isAvailable) {
      throw new NotFoundException();
    }

    await this.prisma.cartItem
      .update({
        where: {
          id: cartItemId,
        },
        data: {
          quantity: updateCartItemDto.quantity,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    return await this.findOneOrFail(cartId);
  }

  async removeCartItem(cartId: string, cartItemId: string, userId: string) {
    const cart = await this.prisma.cart.update({
      where: { id: cartId, userId: userId },
      data: {
        cartItems: {
          delete: {
            id: cartItemId,
          },
        },
      },
    });

    return await this.findOneOrFail(cart.id);
  }

  async checkout(
    cartId: string,
    checkoutCartDto: CheckoutCartDto,
    userId: string,
  ) {
    const cart = await this.prisma.cart
      .findUniqueOrThrow({
        where: {
          id: cartId,
          userId: userId,
        },
        include: {
          cartItems: true,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    if (cart.cartItems.length === 0) {
      throw new NotFoundException();
    }

    const cartItems = cart.cartItems.filter((cartItem) => !cartItem.isVariant);
    const cartVariants = cart.cartItems.filter(
      (cartItem) => cartItem.isVariant,
    );

    const items = await lastValueFrom(
      this.itemsService.GetManyItems({
        ids: cartItems.map((cartItem: { itemId: any }) => cartItem.itemId),
      }),
    );

    const variants = await lastValueFrom(
      this.variantsService.GetManyVariants({
        ids: cartVariants.map((cartItem: { itemId: any }) => cartItem.itemId),
      }),
    );

    const availability = await lastValueFrom(
      this.catalogService.CheckAvailability({
        items: cartItems.map((cartItem) => ({
          id: cartItem.itemId,
          quantity: cartItem.quantity,
        })),
        variants: cartVariants.map((cartItem) => ({
          id: cartItem.itemId,
          quantity: cartItem.quantity,
        })),
      }),
    );

    if (!availability.isAvailable) {
      throw new QuantityNotAvailableException();
    }

    const result = await lastValueFrom(
      this.catalogService.ReserveQuantities({
        items: cartItems.map((cartItem) => ({
          id: cartItem.itemId,
          quantity: cartItem.quantity,
        })),
        variants: cartVariants.map((cartItem) => ({
          id: cartItem.itemId,
          quantity: cartItem.quantity,
        })),
      }),
    );

    if (!result.success) {
      throw new CartCheckoutException(result.message);
    }

    await lastValueFrom(
      this.kafkaClient.emit(
        'order.created',
        instanceToPlain(
          new CreateOrderDto({
            id: randomUUID(),
            userId: userId,
            address: {
              ...checkoutCartDto,
            },
            items: cart.cartItems.map((cartItem: Partial<CartItemEntity>) => {
              if (cartItem.isVariant) {
                const variant = variants.payload.find(
                  (variant) => variant.id === cartItem.itemId,
                );
                const isAvailable = availability.variants.find(
                  (variant) => variant.id === cartItem.itemId,
                ).isAvailable;
                return new CartItemEntity({
                  ...cartItem,
                  variant,
                  isAvailable,
                });
              }
              const item = items.payload.find(
                (item) => item.id === cartItem.itemId,
              );
              const isAvailable = availability.items.find(
                (item) => item.id === cartItem.itemId,
              ).isAvailable;
              return new CartItemEntity({
                ...cartItem,
                item,
                isAvailable,
              });
            }),
          }),
        ),
      ),
    );

    await this.prisma.$transaction([
      this.prisma.cartItem.deleteMany({
        where: {
          cartId: cartId,
        },
      }),
      this.prisma.cart.delete({
        where: {
          id: cartId,
        },
      }),
    ]);
  }
}
