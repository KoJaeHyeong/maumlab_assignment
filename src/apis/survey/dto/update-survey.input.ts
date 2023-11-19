import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateSurveyInput } from './create-survey.input';

@InputType()
export class UpdateSurveyInput extends PartialType(CreateSurveyInput) {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  survey_description?: string;
}
