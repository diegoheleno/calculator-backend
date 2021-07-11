import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from '../../../entity/result.entity';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeleteResultCommand } from '../../impl/delete-result.command';

@CommandHandler(DeleteResultCommand)
export class DeleteResultHandler
    implements ICommandHandler<DeleteResultCommand> {

    constructor(
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>
    ) { }

    async execute(command: DeleteResultCommand): Promise<DeleteResult[]> {
        const { stageId } = command
        const results = await this.resultRepository.find({ stageId });
        const promises = results.map(result => this.resultRepository.delete(result));
        return await Promise.all(promises);
    }
}