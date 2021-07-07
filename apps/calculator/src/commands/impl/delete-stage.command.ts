import { ICommand } from '@nestjs/cqrs';

export class CreateStageCommand implements ICommand {
    constructor(
        public readonly id: string
    ){}
}