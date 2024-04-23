import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import { QuantityRequestDto } from '../dto/catalog/quantity-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from '@prisma/client/catalog';
import { CheckAvailabilityResponseDto } from '../dto/catalog/check-availability.dto';

@GrpcService()
export class CatalogGrpcService {
  constructor(private prisma: PrismaService) {}

  @GrpcMethod('CatalogService')
  async CheckAvailability(quantityRequestDto: QuantityRequestDto) {
    const [itemsAvailable, variantsAvailable] = await this.prisma.$transaction(
      async (tx) => {
        const itemsAvailablePromise = tx.item.findMany({
          where: {
            id: {
              in: quantityRequestDto.items.map((item) => item.id),
            },
            status: Status.APPROVED,
            deletedAt: null,
            variants: {
              none: {},
            },
          },
        });
        const variantsAvailablePromise = tx.variant.findMany({
          where: {
            id: {
              in: quantityRequestDto.variants.map((variant) => variant.id),
            },
            parent: {
              status: Status.APPROVED,
              deletedAt: null,
            },
          },
        });

        return await Promise.all([
          itemsAvailablePromise,
          variantsAvailablePromise,
        ]);
      },
    );

    const items = quantityRequestDto.items.map((item) => {
      const itemAvailable = itemsAvailable.find(
        (availableItem) => availableItem.id === item.id,
      );
      return {
        ...item,
        isAvailable: (itemAvailable?.quantity ?? 0) >= item.quantity,
      };
    });

    const variants = quantityRequestDto.variants.map((variant) => {
      const variantAvailable = variantsAvailable.find(
        (availableVariant) => availableVariant.id === variant.id,
      );
      return {
        ...variant,
        isAvailable: (variantAvailable?.quantity ?? 0) >= variant.quantity,
      };
    });

    return new CheckAvailabilityResponseDto({
      isAvailable:
        items.every((item) => item.isAvailable) &&
        variants.every((variant) => variant.isAvailable) &&
        items.length === quantityRequestDto.items.length &&
        variants.length === quantityRequestDto.variants.length,
      items,
      variants,
    });
  }

  @GrpcMethod('CatalogService')
  async ReserveQuantities(quantityRequestDto: QuantityRequestDto) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const itemsAvailablePromise = tx.item.findMany({
          where: {
            id: {
              in: quantityRequestDto.items.map((item) => item.id),
            },
            status: Status.APPROVED,
            deletedAt: null,
            variants: {
              none: {},
            },
          },
        });
        const variantsAvailablePromise = tx.variant.findMany({
          where: {
            id: {
              in: quantityRequestDto.variants.map((variant) => variant.id),
            },
            parent: {
              status: Status.APPROVED,
              deletedAt: null,
            },
          },
        });

        const [itemsAvailable, variantsAvailable] = await Promise.all([
          itemsAvailablePromise,
          variantsAvailablePromise,
        ]);

        for (const item of quantityRequestDto.items) {
          const itemAvailable = itemsAvailable.find(
            (availableItem) => availableItem.id === item.id,
          );
          if ((itemAvailable?.quantity ?? 0) < item.quantity) {
            throw new Error('Item not available');
          }
          await tx.item.update({
            where: {
              id: item.id,
            },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });
        }

        for (const variant of quantityRequestDto.variants) {
          const variantAvailable = variantsAvailable.find(
            (availableVariant) => availableVariant.id === variant.id,
          );
          if ((variantAvailable?.quantity ?? 0) < variant.quantity) {
            throw new Error('Variant not available');
          }
          await tx.variant.update({
            where: {
              id: variant.id,
            },
            data: {
              quantity: {
                decrement: variant.quantity,
              },
            },
          });
        }
      });
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
    };
  }

  @GrpcMethod('CatalogService')
  async RestoreQuantities(quantityRequestDto: QuantityRequestDto) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const itemsAvailablePromise = tx.item.findMany({
          where: {
            id: {
              in: quantityRequestDto.items.map((item) => item.id),
            },
            variants: {
              none: {},
            },
          },
        });
        const variantsAvailablePromise = tx.variant.findMany({
          where: {
            id: {
              in: quantityRequestDto.variants.map((variant) => variant.id),
            },
          },
        });

        const [itemsAvailable, variantsAvailable] = await Promise.all([
          itemsAvailablePromise,
          variantsAvailablePromise,
        ]);

        for (const item of quantityRequestDto.items) {
          const itemAvailable = itemsAvailable.find(
            (availableItem) => availableItem.id === item.id,
          );
          if (!itemAvailable) {
            throw new Error('Item not available');
          }
          await tx.item.update({
            where: {
              id: item.id,
            },
            data: {
              quantity: {
                increment: item.quantity,
              },
            },
          });
        }

        for (const variant of quantityRequestDto.variants) {
          const variantAvailable = variantsAvailable.find(
            (availableVariant) => availableVariant.id === variant.id,
          );
          if (!variantAvailable) {
            throw new Error('Variant not available');
          }
          await tx.variant.update({
            where: {
              id: variant.id,
            },
            data: {
              quantity: {
                increment: variant.quantity,
              },
            },
          });
        }
      });
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
    };
  }
}
