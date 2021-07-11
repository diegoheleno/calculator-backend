import { Repository } from "typeorm";
import { Action } from "../../entity/action.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetActionQuery } from '../Imp/get-action.query';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetActionQuery)
export class GetActionHandler implements IQueryHandler {

    constructor(
        @InjectRepository(Action)
        private readonly repository: Repository<Action>
    ) { }

    async execute(params: GetActionQuery): Promise<Action[]> {

        if (!params.query.id && !params.query.resultId)
            throw { status: 404, message: 'Action não encontrado' }

        const response = await this.repository.find({ ...params.query });


        if (!response)
            throw { status: 404, message: 'Action não encontrado' }


        const action = response.sort((a, b) => a.order < b.order ? -1 : 1);

        return action
    }
}