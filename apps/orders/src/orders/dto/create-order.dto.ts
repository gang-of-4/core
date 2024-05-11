import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from '../entities/address.entity';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class MediaDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(partial: Partial<MediaDto>) {
    Object.assign(this, partial);
  }
}

class ItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: any;

  @ApiProperty()
  description: string;

  @ApiProperty()
  images: MediaDto[];

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(partial: Partial<ItemDto>) {
    Object.assign(this, partial);
  }
}

export enum OptionType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
}

class OptionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(partial: Partial<OptionDto>) {
    Object.assign(this, partial);
  }
}

class OptionGroupDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: OptionType;

  @ApiProperty({ type: OptionDto, isArray: true, nullable: true })
  @Type(() => OptionDto)
  options?: OptionDto[];

  @ApiProperty()
  @Type(() => Number)
  order: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(partial: Partial<OptionGroupDto>) {
    Object.assign(this, partial);
  }
}

class VariantDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  parent?: ItemDto;

  @ApiProperty()
  groups: OptionGroupDto[];

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(partial: Partial<VariantDto>) {
    Object.assign(this, partial);
  }
}

class OrderItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  item?: ItemDto;

  @ApiProperty()
  variant?: VariantDto;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  isVariant: boolean;

  @ApiProperty()
  isAvailable?: boolean;

  constructor(partial: Partial<OrderItemDto>) {
    Object.assign(this, partial);
  }
}

export class CreateOrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  subtotal: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  address: AddressEntity;

  @ApiProperty({
    isArray: true,
    required: true,
  })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  constructor(partial: Partial<CreateOrderDto>) {
    Object.assign(this, partial);
  }
}
