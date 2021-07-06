import { ICommand } from '@nestjs/cqrs';
import { UpdateStageBody } from '../../dtos/stage.dto';

export class UpdateStageCommand implements ICommand {
    constructor(
        public readonly stage: UpdateStageBody
    ){}
}