import { Repository } from "typeorm";
import { Stage } from "../../entity/stage.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetStageQuery } from '../Imp/get-stage.query';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetStageQuery)
export class GetStageHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Stage)
        private readonly repository: Repository<Stage>
    ) { }

    async execute(params: GetStageQuery): Promise<Stage> {
        
        if (!params.query.id && (!params.query.level || params.query.level < 0))
            throw { status: 404, message: 'Stage não encontrado' }

        const stage = await this.repository.findOne({ ...params.query });
        
        if (!stage)
            throw { status: 404, message: 'Stage não encontrado' }
    
        return stage
    }
}