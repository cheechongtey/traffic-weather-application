import { IsNotEmpty, Validate } from 'class-validator';
import { IsDateTime } from '@/common/validator/isDateTime';

export default class GetDateTimeQuery {
  @Validate(IsDateTime)
  @IsNotEmpty()
  dateTime: string;
}
