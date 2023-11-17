import { Field, InputType, PickType } from '@nestjs/graphql';
import { Survey } from '../entities/survey.entity';

@InputType()
export class CreateSurveyInput extends PickType(Survey, [
  'title',
  'survey_description',
] as const) {
  @Field(() => String)
  title: string;

  @Field(() => String)
  survey_description: string;
}
