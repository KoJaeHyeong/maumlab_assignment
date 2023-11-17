import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompletedSurveyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
