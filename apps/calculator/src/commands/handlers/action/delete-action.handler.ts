import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from '../../../entity/action.entity';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeleteActionCommand } from '../../impl/delete-action.command';

@CommandHandler(DeleteActionCommand)
export class DeleteActionHandler
    implements ICommandHandler<DeleteActionCommand> {

    constructor(
        @InjectRepository(Action)
        private readonly actionRepository: Repository<Action>
    ) { }

    async execute(command: DeleteActionCommand): Promise<DeleteResult[]> {
        const { resultId } = command
        const actions = await this.actionRepository.find({ resultId });
        const promises = actions.map(action => this.actionRepository.delete(action));
        return await Promise.all(promises);
    }
}