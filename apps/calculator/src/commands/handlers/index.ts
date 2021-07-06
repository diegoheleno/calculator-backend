import { CreateStageHandler } from './save-stage.handler';
import { UpdateStageHandler } from './update-stage.handler';
import { CreateResultHandler } from './save-result.handler';
import { CreateOperationHandler } from './save-operation.handler';
import { CreateActionHandler } from './save-action.handler';

export const CommandHandlers = [
    CreateStageHandler,
    UpdateStageHandler,
    CreateResultHandler,
    CreateActionHandler,
    CreateOperationHandler,
];