import { AnswerModule } from 'src/apis/answer/answer.module';
import { ChoiceModule } from 'src/apis/choice/choice.module';
import { CompletedSurveyModule } from 'src/apis/completed-survey/completed-survey.module';
import { ParticipantModule } from 'src/apis/participant/participant.module';
import { QuestionModule } from 'src/apis/question/question.module';
import { SurveyModule } from 'src/apis/survey/survey.module';
import { UserModule } from 'src/apis/user/user.module';

export const apiModules = [
  UserModule,
  SurveyModule,
  QuestionModule,
  ChoiceModule,
  AnswerModule,
  ParticipantModule,
  CompletedSurveyModule,
];
