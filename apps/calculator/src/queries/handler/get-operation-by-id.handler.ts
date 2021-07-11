import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Operation } from "../../entity/operation.entity";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetOperationByIdQuery } from '../Imp/get-operation-by-id.query';

@QueryHandler(GetOperationByIdQuery)
export class GetOperationByIdHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Operation)
        private readonly repository: Repository<Operation>
    ) { }

    async execute(params: GetOperationByIdQuery): Promise<Operation> {
        
        const operations = await this.repository.findOne({ id: params.id });
        
        if (!operations)
            throw { status: 404, message: 'Operation não encontrado' }
    
        return operations
    }
}