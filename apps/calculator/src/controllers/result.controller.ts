import { CreateResultBody } from '../dtos/result.dto';
import { FetchResultQuery } from '../dtos/result.dto';
import { ResultService } from '../services/result.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Res, Req, Body, Get, Put, Query, HttpStatus } from '@nestjs/common';

@ApiTags('calculator')
@ApiBearerAuth()
@Controller('calculator')
export class ResultController {

    constructor(
        private readonly resultService: ResultService,
    ) { }

    @Get('result')
    async fetchResult(@Req() request, @Res() response, @Query() query: FetchResultQuery) {
        try {
            const data = await this.resultService.fetchResult(query);

            return response
                .status(HttpStatus.OK)
                .send({
                    status: HttpStatus.OK,
                    message: 'Result buscado com sucesso',
                    data
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }

    @Post('result')
    @ApiBody({ description: 'Create Result', type: CreateResultBody })
    async createResult(@Req() request, @Res() response, @Body() body: CreateResultBody) {
        try {
            const data = await this.resultService.createResult(body);

            return response
                .status(HttpStatus.CREATED)
                .send({
                    status: HttpStatus.CREATED,
                    message: 'Result criado com sucesso com id: ' + data.id,
                    data
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }

    @Put('result')
    @ApiBody({ description: 'Update Result', type: CreateResultBody })
    async editResult(@Req() request, @Res() response, @Body() body: CreateResultBody) {
        try {
            const data = await this.resultService.createResult(body);

            return response
                .status(HttpStatus.CREATED)
                .send({
                    status: HttpStatus.CREATED,
                    message: 'Result atualizado com sucesso com id: ' + data.id,
                    data
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }
}
