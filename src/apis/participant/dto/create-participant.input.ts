import { Field, InputType, PickType } from '@nestjs/graphql';
import { Participant } from '../entities/participant.entity';

@InputType()
export class CreateParticipantInput extends PickType(Participant, [
  'participant_name',
  'participant_birth',
  'participant_sex',
] as const) {
  @Field(() => String)
  participant_name: string;

  @Field(() => String)
  participant_birth: string;

  @Field(() => String)
  participant_sex: string;
}
