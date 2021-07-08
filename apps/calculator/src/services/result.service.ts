import { Injectable } from '@nestjs/common';
import { Result } from '../entity/result.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateResultCommand } from '../commands/impl/save-result.command';
import { CreateResultBody, FetchResultQuery } from '../dtos/result.dto'
import { GetResultQuery } from '../queries/Imp/get-result.query';

@Injectable()
export class ResultService {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }

  async createResult(result: CreateResultBody): Promise<Result> {
    return await this.commandBus.execute(new CreateResultCommand(result));
  }
  
//   async updateResult(result: UpdateResultBody): Promise<Result> {
//     return await this.commandBus.execute(new UpdateResultCommand(result));
//   }
  
  async fetchResult(query: FetchResultQuery): Promise<Result[]> {
    return await this.queryBus.execute(new GetResultQuery(query));
  }
}
