import { GetStageHandler } from "./get-stage.handler";
import { GetOperationHandler } from "./get-operation.handler";
import { GetResultHandler } from "./get-result.handler";

export const QueriesHandlers = [
    GetStageHandler,
    GetResultHandler,
    GetOperationHandler,
];