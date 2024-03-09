import { validationSchemaForEnv } from './environment-variables';
import Joi from 'joi';

describe('validationSchemaForEnv', () => {
  it('should validate a valid environment variable object', () => {
    const validEnv = {
      DATABASE_URL: 'postgres://user:password@localhost:5432/mydb',
    };

    const { error } = validationSchemaForEnv.validate(validEnv);
    expect(error).toBeUndefined();
  });

  it('should not validate an invalid environment variable object', () => {
    const invalidEnv = {
      // Missing DATABASE_URL
    };

    const { error } = validationSchemaForEnv.validate(invalidEnv);
    expect(error).toBeInstanceOf(Joi.ValidationError);
    expect(error.message).toContain('"DATABASE_URL" is required');
  });
});
