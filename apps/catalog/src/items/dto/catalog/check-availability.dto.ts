import { QuantityResponseDto } from './quantity-response.dto';

export class CheckAvailabilityResponseDto {
  isAvailable: boolean;
  items: QuantityResponseDto[];
  variants: QuantityResponseDto[];

  constructor(partial: Partial<CheckAvailabilityResponseDto>) {
    Object.assign(this, partial);
  }
}
