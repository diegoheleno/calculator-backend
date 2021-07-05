import { Injectable } from '@nestjs/common';
import { Stage } from '../entity/stage.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetStageQuery } from '../queries/Imp/get-stage.query';
import { CreateStageCommand } from '../commands/impl/save-stage.command';
import { CreateStageBody, FetchStageQuery, UpdateStageBody } from '../dtos/calculator.dto';
import { UpdateStageCommand } from '../commands/impl/update-stage.command';

@Injectable()
export class CalculatorService {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }

  async createStage(stage: CreateStageBody): Promise<Stage> {
    return await this.commandBus.execute(new CreateStageCommand(stage));
  }
  
  async updateStage(stage: UpdateStageBody): Promise<Stage> {
    return await this.commandBus.execute(new UpdateStageCommand(stage));
  }
  
  async fetchStage(query: FetchStageQuery): Promise<Stage> {
    return await this.queryBus.execute(new GetStageQuery(query));
  }
}
