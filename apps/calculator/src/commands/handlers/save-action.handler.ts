import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from '../../entity/action.entity';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateActionCommand } from '../impl/save-action.command';

@CommandHandler(CreateActionCommand)
export class CreateActionHandler
    implements ICommandHandler<CreateActionCommand> {

    constructor(
        @InjectRepository(Action)
        private readonly actionRepository: Repository<Action>
    ) { }

    async execute(command: CreateActionCommand): Promise<Action> {

        const { action } = command

        const actionInstance = this.actionRepository.create({ ...action });

        return await this.actionRepository.save(actionInstance);
    }
}