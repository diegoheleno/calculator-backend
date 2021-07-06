import { ICommand } from '@nestjs/cqrs';
import { CreateOperationBody } from '../../dtos/operation.dto';

export class CreateOperationCommand implements ICommand {
    constructor(
        public readonly operation: CreateOperationBody
    ){}
}