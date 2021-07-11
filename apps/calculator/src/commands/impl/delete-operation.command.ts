import { ICommand } from '@nestjs/cqrs';

export class DeleteOperationCommand implements ICommand {
    constructor(
        public readonly stageId: string
    ){}
}