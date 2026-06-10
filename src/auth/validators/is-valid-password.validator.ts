import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidPassword', async: false })
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: any) {
    if (typeof password !== 'string' || password.length < 8) {
      return false; // Must be at least 8 characters
    }

    let digitCount = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password[i];

      if (char === ' ') {
        return false; // Spaces are strictly banned
      }

      if (char >= '0' && char <= '9') {
        digitCount++;
      }
    }

    return digitCount >= 2; // Must contain at least two numbers
  }

  defaultMessage() {
    return '$property must be at least 8 characters, contain no spaces, and include at least 2 numeric digits';
  }
}

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPasswordConstraint,
    });
  };
}
