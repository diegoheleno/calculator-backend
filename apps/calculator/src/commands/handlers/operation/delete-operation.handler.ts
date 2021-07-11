import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from '../../../entity/operation.entity';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeleteOperationCommand } from '../../impl/delete-operation.command';

@CommandHandler(DeleteOperationCommand)
export class DeleteOperationHandler
    implements ICommandHandler<DeleteOperationCommand> {

    constructor(
        @InjectRepository(Operation)
        private readonly operationRepository: Repository<Operation>
    ) { }

    async execute(command: DeleteOperationCommand): Promise<DeleteResult[]> {
        const { stageId } = command
        const operations = await this.operationRepository.find({ stageId });
        const promises = operations.map(operation => this.operationRepository.delete(operation));
        return await Promise.all(promises);
    }
}