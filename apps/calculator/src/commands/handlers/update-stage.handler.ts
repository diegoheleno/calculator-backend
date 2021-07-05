import { Repository } from 'typeorm';
import { Stage } from '../../entity/stage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateStageCommand } from '../impl/update-stage.command';

@CommandHandler(UpdateStageCommand)
export class UpdateStageHandler
    implements ICommandHandler<UpdateStageCommand> {

    constructor(
        @InjectRepository(Stage)
        private readonly stageRepository: Repository<Stage>
    ) { }

    async execute(command: UpdateStageCommand): Promise<Stage> {

        const { stage } = command

        const stageExisting = this.stageRepository.find({ id: stage.id })

        if (!stageExisting)
            throw { status: 404, message: 'Stage não encontrado' }

        const stageInstance = this.stageRepository.create({ ...stageExisting, ...stage });

        return await this.stageRepository.save(stageInstance);
    }
}