import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CalculatorService } from '../services/calculator.service';
import { CreateStageBody, FetchStageQuery, UpdateStageBody } from '../dtos/calculator.dto';
import { Controller, Post, Res, Req, Body, Get, Put, Query, HttpStatus } from '@nestjs/common';

@ApiTags('calculator')
@ApiBearerAuth()
@Controller('calculator')
export class CalculatorController {

    constructor(
        private readonly calculatorService: CalculatorService,
    ) { }

    @Get('stage')
    async fetchStage(@Req() request, @Res() response, @Query() query: FetchStageQuery) {
        try {
            const data = await this.calculatorService.fetchStage(query);

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
            const data = await this.calculatorService.createStage(body);

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
            const data = await this.calculatorService.updateStage(body);

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
