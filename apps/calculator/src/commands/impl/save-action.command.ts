import { ICommand } from '@nestjs/cqrs';
import { CreateActionBody } from '../../dtos/action.dto';

export class CreateActionCommand implements ICommand {
    constructor(
        public readonly action: CreateActionBody
    ){}
}