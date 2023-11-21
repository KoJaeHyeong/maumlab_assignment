import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Survey } from '../entities/survey.entity';

@ObjectType()
export class SurveyPagination {
  @Field(() => [Survey], { description: '설문지 목록' })
  survey: Survey[];

  @Field(() => Int, { description: '설문지 총 개수' })
  total: number;
}
