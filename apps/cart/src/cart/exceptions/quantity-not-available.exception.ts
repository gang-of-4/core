import { HttpStatus, HttpException } from '@nestjs/common';

export class QuantityNotAvailableException extends HttpException {
  constructor() {
    super('Quantity not Avialable', HttpStatus.BAD_REQUEST);
  }
}
