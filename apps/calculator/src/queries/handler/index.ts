import { GetStageHandler } from "./get-stage.handler";
import { GetResultHandler } from "./get-result.handler";
import { GetActionHandler } from "./get-action.handler";
import { GetOperationHandler } from "./get-operation.handler";
import { GetOperationByIdHandler } from "./get-operation-by-id.handler";

export const QueriesHandlers = [
    GetStageHandler,
    GetResultHandler,
    GetActionHandler,
    GetOperationHandler,
    GetOperationByIdHandler,
];