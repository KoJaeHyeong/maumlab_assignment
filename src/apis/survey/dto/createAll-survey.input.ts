import { Field, InputType, PickType } from '@nestjs/graphql';
import { CreateAllQuestionInput } from 'src/apis/question/dto/createAll-question.input';
import { Survey } from '../entities/survey.entity';

@InputType()
export class CreateAllSurveyInput extends PickType(Survey, [
  'title',
  'survey_description',
] as const) {
  @Field(() => String)
  title: string;

  @Field(() => String)
  survey_description: string;

  @Field(() => [CreateAllQuestionInput], { nullable: true })
  question?: CreateAllQuestionInput[];
}
