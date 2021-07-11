import { IQuery } from '@nestjs/cqrs';

export class GetOperationByIdQuery implements IQuery {
    constructor(
        public readonly id: string
    ) { }
}