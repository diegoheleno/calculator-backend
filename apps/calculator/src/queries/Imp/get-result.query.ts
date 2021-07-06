import { IQuery } from '@nestjs/cqrs';
import { FetchResultQuery } from '../../dtos/result.dto';

export class GetResultQuery implements IQuery {
    constructor(
        public readonly query: FetchResultQuery
    ) { }
}