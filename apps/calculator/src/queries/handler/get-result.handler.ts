import { Repository } from "typeorm";
import { Result } from "../../entity/result.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetResultQuery } from '../Imp/get-result.query';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetResultQuery)
export class GetResultHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Result)
        private readonly repository: Repository<Result>
    ) { }

    async execute(params: GetResultQuery): Promise<Result[]> {
        
        if (!params.query.id && !params.query.stageId)
            throw { status: 404, message: 'Result não encontrado' }

        const result = await this.repository.find({ ...params.query });
        
        if (!result)
            throw { status: 404, message: 'Result não encontrado' }
    
        return result
    }
}