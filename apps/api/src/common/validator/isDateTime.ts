import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateTime', async: false })
export class IsDateTime implements ValidatorConstraintInterface {
  validate(value: any) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/; // Example: YYYY-MM-DDTHH:mm:ssZ
    return dateRegex.test(value);
  }

  defaultMessage() {
    return 'Invalid Date Time Format';
  }
}
