import { User } from '@prisma/client/accounts';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
export class IsEmailUniqueRule implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: User['email']) {
    try {
      const result = await this.prisma.user.findUnique({
        where: {
          email: value,
        },
      });
      if (result) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  defaultMessage() {
    return `Email is already used`;
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEmailUniqueRule,
    });
  };
}
