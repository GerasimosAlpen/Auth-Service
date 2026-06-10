import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isLettersOnly', async: false })
export class IsLettersOnlyConstraint implements ValidatorConstraintInterface {
  validate(name: any) {
    if (typeof name !== 'string' || name.length === 0) {
      return false;
    }

    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      const code = name.charCodeAt(i);

      const isLowercase = code >= 97 && code <= 122; // a-z
      const isUppercase = code >= 65 && code <= 90; // A-Z
      const isSpace = char === ' ';

      if (!isLowercase && !isUppercase && !isSpace) {
        return false; // Found an invalid character
      }
    }

    return true;
  }

  defaultMessage() {
    return '$property must contain only letters and spaces';
  }
}

export function IsLettersOnly(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLettersOnlyConstraint,
    });
  };
}
