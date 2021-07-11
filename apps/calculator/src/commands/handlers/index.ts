import { CreateStageHandler } from './save-stage.handler';
import { UpdateStageHandler } from './update-stage.handler';
import { CreateResultHandler } from './result/save-result.handler';
import { CreateOperationHandler } from './operation/save-operation.handler';
import { CreateActionHandler } from './action/save-action.handler';
import { DeleteActionHandler } from './action/delete-action.handler';
import { DeleteOperationHandler } from './operation/delete-operation.handler';
import { DeleteResultHandler } from './result/result-operation.handler';

export const CommandHandlers = [
    CreateStageHandler,
    UpdateStageHandler,
    CreateResultHandler,
    CreateActionHandler,
    CreateOperationHandler,
    DeleteActionHandler,
    DeleteResultHandler,
    DeleteOperationHandler,
];