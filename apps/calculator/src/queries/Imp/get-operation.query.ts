import { IQuery } from '@nestjs/cqrs';
import { FetchOperationQuery } from '../../dtos/operation.dto';

export class GetOperationQuery implements IQuery {
    constructor(
        public readonly query: FetchOperationQuery
    ) { }
}