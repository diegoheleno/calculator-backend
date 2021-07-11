import { ICommand } from '@nestjs/cqrs';

export class DeleteResultCommand implements ICommand {
    constructor(
        public readonly stageId: string
    ){}
}