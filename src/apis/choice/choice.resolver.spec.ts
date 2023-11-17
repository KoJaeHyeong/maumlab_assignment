import { Test, TestingModule } from '@nestjs/testing';
import { ChoiceResolver } from './choice.resolver';
import { ChoiceService } from './choice.service';

describe('ChoiceResolver', () => {
  let resolver: ChoiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChoiceResolver, ChoiceService],
    }).compile();

    resolver = module.get<ChoiceResolver>(ChoiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
