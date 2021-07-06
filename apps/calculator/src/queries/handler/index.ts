import { GetStageHandler } from "./get-stage.handler";
import { GetOperationHandler } from "./get-operation.handler";
import { GetResultHandler } from "./get-result.handler";
import { GetActionHandler } from "./get-action.handler";

export const QueriesHandlers = [
    GetStageHandler,
    GetResultHandler,
    GetActionHandler,
    GetOperationHandler,
];