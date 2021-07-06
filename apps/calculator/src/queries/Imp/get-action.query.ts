import { IQuery } from '@nestjs/cqrs';
import { FetchActionQuery } from '../../dtos/action.dto';

export class GetActionQuery implements IQuery {
    constructor(
        public readonly query: FetchActionQuery
    ) { }
}