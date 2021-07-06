import { CreateOperationBody } from '../dtos/operation.dto';
import { FetchOperationQuery } from '../dtos/operation.dto';
import { OperationService } from '../services/operation.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Res, Req, Body, Get, Put, Query, HttpStatus } from '@nestjs/common';

@ApiTags('calculator')
@ApiBearerAuth()
@Controller('calculator')
export class OperationController {

    constructor(
        private readonly operationService: OperationService,
    ) { }

    @Get('operation')
    async fetchOperation(@Req() request, @Res() response, @Query() query: FetchOperationQuery) {
        try {
            const data = await this.operationService.fetchOperation(query);

            return response
                .status(HttpStatus.OK)
                .send({
                    status: HttpStatus.OK,
                    message: 'Operation buscado com sucesso',
                    data
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }

    @Post('operation')
    @ApiBody({ description: 'Create Operation', type: CreateOperationBody })
    async createOperation(@Req() request, @Res() response, @Body() body: CreateOperationBody) {
        try {
            const data = await this.operationService.createOperation(body);

            return response
                .status(HttpStatus.CREATED)
                .send({
                    status: HttpStatus.CREATED,
                    message: 'Operation criado com sucesso com id: ' + data.id,
                    data
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }

    // @Put('operation')
    // @ApiBody({ description: 'Update Operation', type: UpdateOperationBody })
    // async editOperation(@Req() request, @Res() response, @Body() body: UpdateOperationBody) {
    //     try {
    //         const data = await this.operationService.updateOperation(body);

    //         return response
    //             .status(HttpStatus.CREATED)
    //             .send({
    //                 status: HttpStatus.CREATED,
    //                 message: 'Operation atualizado com sucesso com id: ' + data.id,
    //                 data
    //             });
    //     }
    //     catch (exception) {
    //         return response.status(exception.status ?? 400).send(exception.message);
    //     }
    // }
}
