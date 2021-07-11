import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { StageService } from '../services/stage.service';
import { CreateStageBody, FetchStageQuery, UpdateStageBody } from '../dtos/stage.dto';
import { Controller, Post, Res, Req, Body, Get, Put, Query, HttpStatus, Delete } from '@nestjs/common';
import { OperationService } from '../services/operation.service';
import { ResultService } from '../services/result.service';
import { ActionService } from '../services/action.service';

@ApiTags('calculator')
@ApiBearerAuth()
@Controller('calculator')
export class StageController {

    constructor(
        private readonly stageService: StageService,
        private readonly resultService: ResultService,
        private readonly opearationService: OperationService,
        private readonly actionService: ActionService,
    ) { }

    @Get('stage')
    async fetchStage(@Req() request, @Res() response, @Query() query: FetchStageQuery) {
        try {
            const stage = await this.stageService.fetchStage(query);
            const operations = await this.opearationService.fetchOperation({ stageId: stage.id })
            const results = await this.resultService.fetchResult({ stageId: stage.id })
            
            const promises = results.map(async result => {
                const actions = await this.actionService.fetchAction({ resultId: result.id })
                const promises = actions.map(async action => this.opearationService.fetchOperationById(action.operationId))
                const operations = await Promise.all(promises)
                return { ...result, operations }
            });
             
            return response
                .status(HttpStatus.OK)
                .send({
                    status: HttpStatus.OK,
                    message: 'Stage buscado com sucesso',
                    data: {
                        ...stage,
                        operations,
                        results: await Promise.all(promises)
                    }
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }

    @Post('stage')
    @ApiBody({ description: 'Create Stage', type: CreateStageBody })
    async createStage(@Req() request, @Res() response, @Body() body: CreateStageBody) {
        try {
            const data = await this.stageService.createStage(body);

            return response
                .status(HttpStatus.CREATED)
                .send({
                    status: HttpStatus.CREATED,
                    message: 'Stage criado com sucesso com id: ' + data.id,
                    data
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }

    @Put('stage')
    @ApiBody({ description: 'Update Stage', type: UpdateStageBody })
    async editStage(@Req() request, @Res() response, @Body() body: UpdateStageBody) {
        try {
            const data = await this.stageService.updateStage(body);

            return response
                .status(HttpStatus.CREATED)
                .send({
                    status: HttpStatus.CREATED,
                    message: 'Stage atualizado com sucesso com id: ' + data.id,
                    data
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }

    @Delete('stage')
    async deleteStage(@Req() request, @Res() response, @Query() query: FetchStageQuery) {
        try {
            const stage = await this.stageService.fetchStage(query);
            const results = await this.resultService.fetchResult({ stageId: stage.id })

            const promises = [
                ...results.map(result => this.actionService.deleteAction(result.id)),
                this.resultService.deleteResult(stage.id),
                this.opearationService.deleteOperation(stage.id),
            ]

            await Promise.all(promises);
            
            return response
                .status(HttpStatus.CREATED)
                .send({
                    status: HttpStatus.CREATED,
                    message: 'Stage limpo com sucesso!',
                    data: stage
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }
}
