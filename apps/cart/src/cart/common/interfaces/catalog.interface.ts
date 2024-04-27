import { Observable } from 'rxjs';

export interface ItemsService {
  GetItem(getItemDto: { id: string }): Observable<Item>;

  GetManyItems(getManyItemDto: {
    ids: string[];
  }): Observable<GetManyItemsResponse>;
}

export interface VariantsService {
  GetVariant(getItemDto: { id: string }): Observable<Variant>;

  GetManyVariants(getManyItemDto: {
    ids: string[];
  }): Observable<GetManyVariantsResponse>;
}

export interface CatalogService {
  CheckAvailability(
    quantityRequest: QuantityRequest,
  ): Observable<CheckAvailabilityResponse>;

  ReserveQuantities(
    quantityRequest: QuantityRequest,
  ): Observable<SimpleSuccessResponse>;

  RestoreQuantities(
    quantityRequest: QuantityRequest,
  ): Observable<SimpleSuccessResponse>;
}

interface CheckAvailabilityResponse {
  isAvailable: boolean;
  items: AvailabilityResponse[];
  variants: AvailabilityResponse[];
}

interface AvailabilityResponse {
  id: string;
  quantity: number;
  isAvailable: boolean;
}

interface QuantityRequest {
  items?: EntityQuantity[];
  variants?: EntityQuantity[];
}

export interface EntityQuantity {
  id: string;
  quantity: number;
}

export interface GetManyItemsResponse {
  payload: Item[];
}

export interface GetManyVariantsResponse {
  payload: Variant[];
}

export interface Item {
  id: string;
  name: string;
  sku: string;
  slug: string;
  quantity: number;
  price: number;
  description: string;
  storeId: string;
  status: string;
  order: number;
  isActive: boolean;
  categories: Category[];
  groups: OptionGroup[];
  variants: Variant[];
  images: Media[];
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  id: string;
  quantity?: number;
  price?: number;
  parent: Item;
  groups: OptionGroup[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  banner: string;
  description: string;
  order: number;
  parent?: Category;
  items: Item[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OptionGroup {
  id: string;
  title: string;
  type: string;
  order: number;
  options: Option[];
  createdAt: string;
  updatedAt: string;
}

export interface Option {
  id: string;
  label: string;
  value: string;
  group: OptionGroup;
}

export interface Media {
  id: string;
  name: string;
  url: string;
  size: number;
  extension: string;
  createdAt: string;
  updatedAt: string;
}

interface SimpleSuccessResponse {
  success: boolean;
  message: string;
}
