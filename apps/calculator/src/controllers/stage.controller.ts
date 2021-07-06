import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { StageService } from '../services/stage.service';
import { CreateStageBody, FetchStageQuery, UpdateStageBody } from '../dtos/stage.dto';
import { Controller, Post, Res, Req, Body, Get, Put, Query, HttpStatus } from '@nestjs/common';

@ApiTags('calculator')
@ApiBearerAuth()
@Controller('calculator')
export class StageController {

    constructor(
        private readonly stageService: StageService,
    ) { }

    @Get('stage')
    async fetchStage(@Req() request, @Res() response, @Query() query: FetchStageQuery) {
        try {
            const data = await this.stageService.fetchStage(query);

            return response
                .status(HttpStatus.OK)
                .send({
                    status: HttpStatus.OK,
                    message: 'Stage buscado com sucesso',
                    data
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
}
