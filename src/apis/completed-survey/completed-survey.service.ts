import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from '../participant/entities/participant.entity';
import { Survey } from '../survey/entities/survey.entity';
import { CompletedSurvey } from './entities/completed-survey.entity';

@Injectable()
export class CompletedSurveyService {
  constructor(
    @InjectRepository(CompletedSurvey)
    private readonly completedSurvey: Repository<CompletedSurvey>,
  ) {}

  async create(survey: Survey, participant: Participant) {
    const result = await this.completedSurvey.save({
      survey: survey,
      participant: participant,
    });

    return result;
  }

  async findOneWithSurveyAndParticipant(
    surveyId: string,
    participantId: string,
  ) {
    return await this.completedSurvey.findOne({
      where: {
        survey: { survey_id: surveyId },
        participant: { participant_id: participantId },
      },
    });
  }

  async findAll(surveyId: string) {
    const result = await this.completedSurvey
      .createQueryBuilder('completed_survey')
      .leftJoinAndSelect('completed_survey.participant', 'participant')
      .leftJoinAndSelect('completed_survey.survey', 'survey')
      .where('survey.survey_id = :survey_id', { survey_id: surveyId })
      .leftJoinAndSelect('survey.question', 'question')
      .leftJoinAndSelect('question.answer', 'answer')
      .andWhere('answer.participant_id = participant.participant_id')
      .leftJoinAndSelect('answer.choice', 'choice')
      .orderBy('question.item_no', 'ASC')
      .getMany();

    const resultWithTotal = result.map((completedSurvey) => {
      const total_score = completedSurvey.survey.question.reduce(
        (acc, question) => {
          return (
            acc +
            question.answer.reduce((answerAcc, answer) => {
              return answerAcc + answer.choice.choice_score;
            }, 0)
          );
        },
        0,
      );

      return { ...completedSurvey, total_score };
    });

    return resultWithTotal;
  }

  async findOneSurveyWithAnswer(surveyId: string, participantId: string) {
    const result = await this.completedSurvey
      .createQueryBuilder('completed_survey')
      .leftJoinAndSelect('completed_survey.participant', 'participant')
      .leftJoinAndSelect('completed_survey.survey', 'survey')
      .where('survey.survey_id = :survey_id', { survey_id: surveyId })
      .leftJoinAndSelect('survey.question', 'question')
      .leftJoinAndSelect('question.answer', 'answer')
      .leftJoinAndSelect('answer.choice', 'choice')
      .andWhere('answer.participant_id = :participant_id', {
        participant_id: participantId,
      })
      .orderBy('question.item_no', 'ASC')
      .getOne();

    const total_score = result.survey.question.reduce((acc, question) => {
      return (
        acc +
        question.answer.reduce((answerAcc, answer) => {
          return answerAcc + answer.choice.choice_score;
        }, 0)
      );
    }, 0);

    return { ...result, total_score };
  }

  async remove(surveyId: string, participantId: string) {
    const result = await this.completedSurvey.softDelete({
      participant: { participant_id: participantId },
      survey: { survey_id: surveyId },
    });

    return result.affected ? true : false;
  }
}
