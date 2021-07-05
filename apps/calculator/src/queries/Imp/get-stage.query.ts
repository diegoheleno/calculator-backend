import { IQuery } from '@nestjs/cqrs';
import { FetchStageQuery } from '../../dtos/calculator.dto';

export class GetStageQuery implements IQuery {
    constructor(
        public readonly query: FetchStageQuery
    ) { }
}