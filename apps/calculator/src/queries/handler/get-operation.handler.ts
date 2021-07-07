import { Repository } from "typeorm";
import { Operation } from "../../entity/operation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetOperationQuery } from '../Imp/get-operation.query';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetOperationQuery)
export class GetOperationHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Operation)
        private readonly repository: Repository<Operation>
    ) { }

    async execute(params: GetOperationQuery): Promise<Operation[]> {
        
        if (!params.query.id && !params.query.stageId)
            throw { status: 404, message: 'Operation não encontrado' }

        const operations = await this.repository.find({ ...params.query });
        
        if (!operations)
            throw { status: 404, message: 'Operation não encontrado' }
    
        return operations
    }
}