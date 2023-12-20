import { Role } from '@prisma/client/accounts';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { RolesService } from '../../roles/services/roles.service';

@ValidatorConstraint({ name: 'RoleExists', async: true })
export class RoleExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly rolesService: RolesService) {}

  async validate(roleId: Role['id']) {
    if (await this.rolesService.findOne(roleId)) {
      return true;
    }
    return false;
  }

  defaultMessage() {
    return `Role doesn't exist`;
  }
}

export function RoleExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'RoleExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: RoleExistsRule,
    });
  };
}
