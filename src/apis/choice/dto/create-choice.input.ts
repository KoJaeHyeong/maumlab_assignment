import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChoiceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
