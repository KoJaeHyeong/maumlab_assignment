import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantInput } from '../participant/dto/create-participant.input';
import { UpdateParticipantInput } from '../participant/dto/update-participant.input';
import { Participant } from '../participant/entities/participant.entity';
import { SurveyService } from '../survey/survey.service';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    private readonly surveyService: SurveyService,
  ) {}

  async create(
    surveyId: string,
    createParticipantInput: CreateParticipantInput,
    createAnswerInput: CreateAnswerInput[],
  ) {
    let participant: Participant;

    participant = await this.participantRepository.findOne({
      where: {
        participant_name: createParticipantInput.participant_name,
        participant_birth: createParticipantInput.participant_birth,
      },
    });

    if (!participant) {
      participant = await this.participantRepository.save(
        createParticipantInput,
      );
    }

    const result = createAnswerInput.map((answer) => {
      return this.answerRepository.save({
        choice: { choice_id: answer.choice_id },
        question: { question_id: answer.question_id },
        participant: participant,
        survey: { survey_id: surveyId },
      });
    });

    return result;
  }

  async update(
    participant: UpdateParticipantInput,
    updateAnswerInput: UpdateAnswerInput[],
  ) {
    const isExistParticipant = await this.participantRepository.findOne({
      where: {
        participant_name: participant.participant_name,
        participant_birth: participant.participant_birth,
      },
    });

    if (!isExistParticipant)
      throw new NotFoundException('응답한 설문이 존재 하지 않습니다.');

    const result = updateAnswerInput.map(async (answer) => {
      const newAnswer = {
        answer_id: answer.answer_id,
        choice: { choice_id: answer.choice_id },
        // question: { question_id: answer.question_id },
        // participant: { participant_id: isExistParticipant.participant_id },
      };

      return await this.answerRepository.save(newAnswer);
    });

    return result;
  }

  async findAll(surveyId: string, participant: UpdateParticipantInput) {
    const isExistParticipant = await this.participantRepository.findOne({
      where: {
        participant_name: participant.participant_name,
        participant_birth: participant.participant_birth,
      },
    });

    if (!isExistParticipant)
      throw new NotFoundException('설문참여자를 찾을수 없습니다.');

    const isSurvey = await this.surveyService.findOneById(surveyId);

    if (!isSurvey) throw new NotFoundException('설문지가 존재하지 않습니다.');

    const answer = await this.answerRepository.find({
      where: {
        survey: { survey_id: surveyId },
        participant: { participant_id: isExistParticipant.participant_id },
      },
      order: { question: { item_no: 'ASC' } },
      relations: ['choice', 'question'],
    });

    return answer;
  }

  async findOneAnswer(
    surveyId: string,
    answerId: string,
    participant: UpdateParticipantInput,
  ) {
    const isExistParticipant = await this.participantRepository.findOne({
      where: {
        participant_name: participant.participant_name,
        participant_birth: participant.participant_birth,
      },
    });

    if (!isExistParticipant)
      throw new NotFoundException('설문참여자를 찾을수 없습니다.');

    const isSurvey = await this.surveyService.findOneById(surveyId);

    if (!isSurvey) throw new NotFoundException('설문지가 존재하지 않습니다.');

    const answer = await this.answerRepository.findOne({
      where: {
        survey: { survey_id: surveyId },
        answer_id: answerId,
        participant: { participant_id: isExistParticipant.participant_id },
      },
      relations: ['choice', 'question'],
    });

    if (!answer) throw new NotFoundException('답변이 존재하지 않습니다.');

    return answer;
  }

  async remove(answerId: string) {
    const result = await this.answerRepository.softDelete(answerId);

    return result.affected ? true : false;
  }
}
