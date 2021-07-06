import { ICommand } from '@nestjs/cqrs';
import { CreateResultBody } from '../../dtos/result.dto';

export class CreateResultCommand implements ICommand {
    constructor(
        public readonly result: CreateResultBody
    ){}
}