import { IsNotEmpty, Validate } from 'class-validator';
import { IsDateTime } from 'src/validator/isDateTime';

export default class GetDateTimeQuery {
  @Validate(IsDateTime)
  @IsNotEmpty()
  dateTime: string;
}
