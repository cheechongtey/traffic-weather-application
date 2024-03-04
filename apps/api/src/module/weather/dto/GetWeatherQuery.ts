import { IsNotEmpty, Validate } from 'class-validator';
import { IsDateTime } from '@/common/validator/isDateTime';

export default class GetWeatherQuery {
  @Validate(IsDateTime)
  @IsNotEmpty()
  dateTime: string;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;
}
