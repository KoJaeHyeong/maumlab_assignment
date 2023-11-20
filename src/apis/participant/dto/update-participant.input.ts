import { Field, InputType, PickType } from '@nestjs/graphql';
import { Participant } from '../entities/participant.entity';

@InputType()
export class UpdateParticipantInput extends PickType(Participant, [
  'participant_name',
  'participant_birth',
] as const) {
  @Field(() => String)
  participant_name: string;

  @Field(() => String)
  participant_birth: string;
}
