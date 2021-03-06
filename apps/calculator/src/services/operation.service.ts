import { Injectable } from '@nestjs/common';
import { Operation } from '../entity/operation.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOperationCommand } from '../commands/impl/save-operation.command';
import { CreateOperationBody, FetchOperationQuery } from '../dtos/operation.dto'
import { GetOperationQuery } from '../queries/Imp/get-operation.query';
import { GetOperationByIdQuery } from '../queries/Imp/get-operation-by-id.query';
import { DeleteOperationCommand } from '../commands/impl/delete-operation.command';

@Injectable()
export class OperationService {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }

  async createOperation(operation: CreateOperationBody): Promise<Operation> {
    return await this.commandBus.execute(new CreateOperationCommand(operation));
  }

  //   async updateOperation(operation: UpdateOperationBody): Promise<Operation> {
  //     return await this.commandBus.execute(new UpdateOperationCommand(operation));
  //   }

  async fetchOperation(query: FetchOperationQuery): Promise<Operation[]> {
    return await this.queryBus.execute(new GetOperationQuery(query));
  }
  
  async fetchOperationById(id: string): Promise<Operation> {
    return await this.queryBus.execute(new GetOperationByIdQuery(id));
  }
  
  async deleteOperation(stageId: string): Promise<any> {
    return await this.commandBus.execute(new DeleteOperationCommand(stageId));
  }
}
