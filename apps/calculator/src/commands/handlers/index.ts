import { CreateStageHandler } from './save-stage.handler';
import { UpdateStageHandler } from './update-stage.handler';
import { CreateResultHandler } from './save-result.handler';
import { CreateOperationHandler } from './save-operation.handler';

export const CommandHandlers = [
    CreateStageHandler,
    UpdateStageHandler,
    CreateResultHandler,
    CreateOperationHandler,
];