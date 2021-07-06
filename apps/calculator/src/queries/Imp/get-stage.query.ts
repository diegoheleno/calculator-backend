import { IQuery } from '@nestjs/cqrs';
import { FetchStageQuery } from '../../dtos/stage.dto';

export class GetStageQuery implements IQuery {
    constructor(
        public readonly query: FetchStageQuery
    ) { }
}