export class QuantityResponseDto {
  id: string;
  quantity: number;
  isAvailable: boolean;

  constructor(partial: Partial<QuantityResponseDto>) {
    Object.assign(this, partial);
  }
}
