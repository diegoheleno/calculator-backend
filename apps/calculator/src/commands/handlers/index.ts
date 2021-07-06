import { CreateStageHandler } from './save-stage.handler';
import { UpdateStageHandler } from './update-stage.handler';
import { CreateOperationHandler } from './save-operation.handler';

export const CommandHandlers = [
    CreateStageHandler,
    UpdateStageHandler,
    CreateOperationHandler
];