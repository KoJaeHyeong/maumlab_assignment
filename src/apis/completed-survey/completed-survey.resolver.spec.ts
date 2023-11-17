import { Test, TestingModule } from '@nestjs/testing';
import { CompletedSurveyResolver } from './completed-survey.resolver';
import { CompletedSurveyService } from './completed-survey.service';

describe('CompletedSurveyResolver', () => {
  let resolver: CompletedSurveyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedSurveyResolver, CompletedSurveyService],
    }).compile();

    resolver = module.get<CompletedSurveyResolver>(CompletedSurveyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
