import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { OptionGroupsService } from '../services/option-groups.service';
import { OptionGroup } from '@prisma/client/catalog';

@ValidatorConstraint({ name: 'GroupExists', async: true })
export class GroupExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly optionGroupsService: OptionGroupsService) {}

  async validate(groupId: OptionGroup['id']) {
    if (await this.optionGroupsService.findOne(groupId)) {
      return true;
    }
    return false;
  }

  defaultMessage() {
    return `Option Group doesn't exist`;
  }
}

export function GroupExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'GroupExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: GroupExistsRule,
    });
  };
}
