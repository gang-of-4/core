import { HttpStatus, HttpException } from '@nestjs/common';

export class VariantsException extends HttpException {
  constructor() {
    super(
      'an error happend when trying to create item variants',
      HttpStatus.BAD_REQUEST,
    );
  }
}
