import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateCompletedSurveyInput {
  @IsUUID()
  @Field(() => String)
  survey_id: string;

  @IsUUID()
  @Field(() => String)
  participant_id: string;
}
