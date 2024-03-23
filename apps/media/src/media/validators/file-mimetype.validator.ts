import { FileValidator } from '@nestjs/common';
import * as fileType from 'file-type-mime';

export interface FileMimeTypeValidatorOptions {
  mimeTypes: string[];
}

export class FileMimeTypeValidator extends FileValidator {
  private _allowedMimeTypes: string[];

  constructor(
    protected readonly validationOptions: FileMimeTypeValidatorOptions,
  ) {
    super(validationOptions);
    this._allowedMimeTypes = this.validationOptions.mimeTypes;
  }

  public isValid(file?: any): boolean {
    const response = fileType.parse(file.buffer);
    return this._allowedMimeTypes.includes(response.mime);
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(
      ', ',
    )}`;
  }
}
