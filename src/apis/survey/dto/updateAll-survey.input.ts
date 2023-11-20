import { Field, InputType } from '@nestjs/graphql';
import { UpdateAllQuestionInput } from 'src/apis/question/dto/updateAll-question.input';

@InputType()
export class UpdateAllSurveyInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  survey_description?: string;

  @Field(() => [UpdateAllQuestionInput], { nullable: true })
  question?: UpdateAllQuestionInput[];
}
