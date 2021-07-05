import { ICommand } from '@nestjs/cqrs';
import { UpdateStageBody } from '../../dtos/calculator.dto';

export class UpdateStageCommand implements ICommand {
    constructor(
        public readonly stage: UpdateStageBody
    ){}
}