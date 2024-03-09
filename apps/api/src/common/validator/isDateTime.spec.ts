import { IsDateTime } from './isDateTime';

describe('IsDateTime', () => {
  let validator: IsDateTime;

  beforeEach(() => {
    validator = new IsDateTime();
  });

  it('should validate a valid date-time string', () => {
    const validDateTime = '2023-04-01T12:34:56';
    expect(validator.validate(validDateTime)).toBe(true);
  });

  it('should not validate an invalid date-time string', () => {
    const invalidDateTime = '2023-04-01 12:34:56'; // Incorrect format
    expect(validator.validate(invalidDateTime)).toBe(false);
  });
});
