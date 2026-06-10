import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidEmailDomain', async: false })
export class IsValidEmailDomainConstraint implements ValidatorConstraintInterface {
  validate(email: any) {
    if (typeof email !== 'string' || email.length === 0) {
      return false;
    }

    // Count occurrences of "@"
    let atCount = 0;
    for (let i = 0; i < email.length; i++) {
      if (email[i] === '@') {
        atCount++;
      }
    }

    if (atCount !== 1) {
      return false; // Must contain exactly one '@'
    }

    // Split the email into local and domain parts
    const parts = email.split('@');
    const localPart = parts[0];
    const domainPart = parts[1];

    if (localPart.length === 0 || domainPart.length === 0) {
      return false; // Local part or domain part cannot be empty
    }

    // Check that there is at least one '.' in the domain part
    let dotCount = 0;
    for (let i = 0; i < domainPart.length; i++) {
      if (domainPart[i] === '.') {
        dotCount++;
      }
    }

    if (dotCount === 0) {
      return false; // Domain part must contain at least one dot
    }

    // Check approved suffixes
    const approvedSuffixes = ['.com', '.net', '.org', '.id'];
    let hasValidSuffix = false;
    for (let i = 0; i < approvedSuffixes.length; i++) {
      const suffix = approvedSuffixes[i];
      if (email.endsWith(suffix)) {
        hasValidSuffix = true;
        break;
      }
    }

    return hasValidSuffix;
  }

  defaultMessage() {
    return '$property must be a valid email and end with .com, .net, .org, or .id';
  }
}

export function IsValidEmailDomain(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidEmailDomainConstraint,
    });
  };
}
