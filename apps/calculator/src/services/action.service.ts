import { Injectable } from '@nestjs/common';
import { Action } from '../entity/action.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateActionCommand } from '../commands/impl/save-action.command';
import { CreateActionBody, FetchActionQuery } from '../dtos/action.dto'
import { GetActionQuery } from '../queries/Imp/get-action.query';

@Injectable()
export class ActionService {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }

  async createAction(action: CreateActionBody): Promise<Action> {
    return await this.commandBus.execute(new CreateActionCommand(action));
  }
  
//   async updateAction(action: UpdateActionBody): Promise<Action> {
//     return await this.commandBus.execute(new UpdateActionCommand(action));
//   }
  
  async fetchAction(query: FetchActionQuery): Promise<Action> {
    return await this.queryBus.execute(new GetActionQuery(query));
  }
}
