import { CreateActionBody } from '../dtos/action.dto';
import { FetchActionQuery } from '../dtos/action.dto';
import { ActionService } from '../services/action.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Res, Req, Body, Get, Put, Query, HttpStatus } from '@nestjs/common';

@ApiTags('calculator')
@ApiBearerAuth()
@Controller('calculator')
export class ActionController {

    constructor(
        private readonly actionService: ActionService,
    ) { }

    @Get('action')
    async fetchAction(@Req() request, @Res() response, @Query() query: FetchActionQuery) {
        try {
            const data = await this.actionService.fetchAction(query);

            return response
                .status(HttpStatus.OK)
                .send({
                    status: HttpStatus.OK,
                    message: 'Action buscado com sucesso',
                    data
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }

    @Post('action')
    @ApiBody({ description: 'Create Action', type: [CreateActionBody] })
    async createAction(@Req() request, @Res() response, @Body() body: CreateActionBody[]) {
        try {
            const promises = body.map(action => this.actionService.createAction(action));

            const data = await Promise.all(promises);

            return response
                .status(HttpStatus.CREATED)
                .send({
                    status: HttpStatus.CREATED,
                    message: 'Actions criadas com sucesso',
                    data
                });
        }
        catch (exception) {
            return response.status(exception.status ?? 400).send(exception.message);
        }
    }

    // @Put('action')
    // @ApiBody({ description: 'Update Action', type: UpdateActionBody })
    // async editAction(@Req() request, @Res() response, @Body() body: UpdateActionBody) {
    //     try {
    //         const data = await this.actionService.updateAction(body);

    //         return response
    //             .status(HttpStatus.CREATED)
    //             .send({
    //                 status: HttpStatus.CREATED,
    //                 message: 'Action atualizado com sucesso com id: ' + data.id,
    //                 data
    //             });
    //     }
    //     catch (exception) {
    //         return response.status(exception.status ?? 400).send(exception.message);
    //     }
    // }
}
