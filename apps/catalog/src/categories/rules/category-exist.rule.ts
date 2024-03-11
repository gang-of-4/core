import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { CategoriesService } from '../services/categories.service';
import { Cateogry } from '@prisma/client/catalog';

@ValidatorConstraint({ name: 'CategoryExists', async: true })
export class CategoryExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly categoriesService: CategoriesService) {}

  async validate(categoryId: Cateogry['id']) {
    if (await this.categoriesService.findOne(categoryId)) {
      return true;
    }
    return false;
  }

  defaultMessage() {
    return `Category doesn't exist`;
  }
}

export function CategoryExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'CategoryExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CategoryExistsRule,
    });
  };
}
