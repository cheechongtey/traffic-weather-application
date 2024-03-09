import { IsNotEmpty } from 'class-validator';

export default class GetRecommendMessageQuery {
  @IsNotEmpty()
  uuid: string;
}
