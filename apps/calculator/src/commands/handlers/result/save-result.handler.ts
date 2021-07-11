import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from '../../../entity/result.entity';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateResultCommand } from '../../impl/save-result.command';

@CommandHandler(CreateResultCommand)
export class CreateResultHandler
    implements ICommandHandler<CreateResultCommand> {

    constructor(
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>
    ) { }

    async execute(command: CreateResultCommand): Promise<Result> {

        const { result } = command

        const resultInstance = this.resultRepository.create({ ...result });

        return await this.resultRepository.save(resultInstance);
    }
}