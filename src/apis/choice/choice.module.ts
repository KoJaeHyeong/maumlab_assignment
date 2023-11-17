import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceResolver } from './choice.resolver';
import { ChoiceService } from './choice.service';
import { Choice } from './entities/choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Choice])],
  providers: [ChoiceResolver, ChoiceService],
})
export class ChoiceModule {}
