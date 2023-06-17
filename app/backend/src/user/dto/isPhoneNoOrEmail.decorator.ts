import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserRole } from '../entity/user.entity';

@ValidatorConstraint({ name: 'isPhoneNumberOrEmail', async: false })
export class IsPhoneNumberOrEmailConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    const role = (args.object as any)['role'];

    if (role === UserRole.CUSTOMER) {
      return value !== null && value !== undefined && value !== '';
    } else if (role === UserRole.RESTAURANT_OWNER) {
      return relatedValue !== null && relatedValue !== undefined && relatedValue !== '';
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const role = (args.object as any)['role'];
    return role === UserRole.CUSTOMER ? 
      'Phone number must be provided for customers' :
      'Email must be provided for restaurant owners';
  }
}

export function IsPhoneNumberOrEmail(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumberOrEmail',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsPhoneNumberOrEmailConstraint,
    });
  };
}