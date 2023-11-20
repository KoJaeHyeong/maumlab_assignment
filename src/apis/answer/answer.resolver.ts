import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateParticipantInput } from '../participant/dto/create-participant.input';
import { UpdateParticipantInput } from '../participant/dto/update-participant.input';
import { AnswerService } from './answer.service';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => [Answer], { description: '답변 등록' })
  async createAnswer(
    @Args('survey_id') surveyId: string,
    @Args('createParticipantInput')
    createParticipantInput: CreateParticipantInput,
    @Args('createAnswerInput', { type: () => [CreateAnswerInput] })
    createAnswerInput: CreateAnswerInput[],
  ) {
    return await this.answerService.create(
      surveyId,
      createParticipantInput,
      createAnswerInput,
    );
  }

  @Mutation(() => [Answer], { description: '답변 수정' })
  async updateAnswer(
    @Args('participantInput')
    participantInput: UpdateParticipantInput,
    @Args('updateAnswerInput', { type: () => [UpdateAnswerInput] })
    updateAnswerInput: UpdateAnswerInput[],
  ) {
    return await this.answerService.update(participantInput, updateAnswerInput);
  }

  @Query(() => [Answer], {
    description: '특정 참여자의 설문에 대한 모든 답변 조회',
  })
  async fetchAllAnswer(
    @Args('survey_id') surveyId: string,
    @Args('participant') participant: UpdateParticipantInput,
  ) {
    return await this.answerService.findAll(surveyId, participant);
  }

  @Query(() => Answer, { description: '설문에 대한 답변 조회' })
  async fetchAnswer(
    @Args('survey_id') surveyId: string,
    @Args('answer_id') answerId: string,
    @Args('participant') participant: UpdateParticipantInput,
  ) {
    return await this.answerService.findOneAnswer(
      surveyId,
      answerId,
      participant,
    );
  }

  @Mutation(() => Boolean, { description: '답변 삭제' })
  async removeAnswer(@Args('answer_id') answerId: string) {
    return await this.answerService.remove(answerId);
  }
}
