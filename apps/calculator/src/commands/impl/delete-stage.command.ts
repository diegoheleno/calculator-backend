import { ICommand } from '@nestjs/cqrs';
import { CreateStageBody } from '../../dtos/stage.dto';

export class CreateStageCommand implements ICommand {
    constructor(
        public readonly stage: CreateStageBody
    ){}
}