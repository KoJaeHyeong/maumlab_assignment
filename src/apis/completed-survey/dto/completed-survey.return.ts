import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Participant } from 'src/apis/participant/entities/participant.entity';
import { Survey } from 'src/apis/survey/entities/survey.entity';

@ObjectType()
export class CompletedSurveyWithScore {
  @Field(() => Participant)
  participant: Participant;

  @Field(() => Survey)
  survey: Survey;

  @Field(() => Int)
  total_score: number;
}
// extends PickType(CompletedSurvey, [
//   'survey',
//   'participant',
// ] as const)
