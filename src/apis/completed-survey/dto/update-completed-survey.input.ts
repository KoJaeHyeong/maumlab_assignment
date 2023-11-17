import { CreateCompletedSurveyInput } from './create-completed-survey.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompletedSurveyInput extends PartialType(CreateCompletedSurveyInput) {
  @Field(() => Int)
  id: number;
}
