import { Test, TestingModule } from '@nestjs/testing';
import { CompletedSurveyService } from './completed-survey.service';

describe('CompletedSurveyService', () => {
  let service: CompletedSurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedSurveyService],
    }).compile();

    service = module.get<CompletedSurveyService>(CompletedSurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
