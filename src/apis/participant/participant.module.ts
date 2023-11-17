import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { ParticipantResolver } from './participant.resolver';
import { ParticipantService } from './participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [ParticipantResolver, ParticipantService],
})
export class ParticipantModule {}
