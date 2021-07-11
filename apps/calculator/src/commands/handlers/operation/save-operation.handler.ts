import { CreateOperationCommand } from '../../impl/save-operation.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Operation } from '../../../entity/operation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateOperationCommand)
export class CreateOperationHandler
    implements ICommandHandler<CreateOperationCommand> {

    constructor(
        @InjectRepository(Operation)
        private readonly operationRepository: Repository<Operation>
    ) { }

    async execute(command: CreateOperationCommand): Promise<Operation> {

        const { operation} = command

        const operationInstance = this.operationRepository.create({ ...operation });

        return await this.operationRepository.save(operationInstance);
    }
}