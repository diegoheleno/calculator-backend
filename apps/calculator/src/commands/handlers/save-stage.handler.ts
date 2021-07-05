import { CreateStageCommand } from '../impl/save-stage.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Stage } from '../../entity/stage.entity';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateStageCommand)
export class CreateStageHandler
    implements ICommandHandler<CreateStageCommand> {

    constructor(
        @InjectRepository(Stage)
        private readonly stageRepository: Repository<Stage>
    ) { }

    async execute(command: CreateStageCommand): Promise<Stage> {

        const { stage } = command

        if (stage.level < 1)
            throw { message: 'Fase inválida: ' + stage.level }
        
        const stageInstance = this.stageRepository.create({ ...stage });

        return await this.stageRepository.save(stageInstance);
    }
}