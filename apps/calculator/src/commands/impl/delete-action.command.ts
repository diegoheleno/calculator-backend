import { ICommand } from '@nestjs/cqrs';

export class DeleteActionCommand implements ICommand {
    constructor(
        public readonly resultId: string
    ){}
}