import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantInput } from './dto/create-participant.input';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}

  async createParticpant(participant: CreateParticipantInput) {
    return await this.participantRepository.save(participant);
  }

  async findOneParticipantByDto(participant: any) {
    return await this.participantRepository.findOne({
      where: {
        participant_name: participant.participant_name,
        participant_birth: participant.participant_birth,
      },
    });
  }
}
