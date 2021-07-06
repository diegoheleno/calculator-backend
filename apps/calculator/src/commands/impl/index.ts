import { CreateStageCommand } from './save-stage.command';
import { UpdateStageCommand } from './update-stage.command';
import { CreateResultCommand } from './save-result.command';
import { CreateOperationCommand } from './save-operation.command';
import { CreateActionCommand } from './save-action.command';

export const Commands = [
    CreateStageCommand,
    UpdateStageCommand,
    CreateResultCommand,
    CreateActionCommand,
    CreateOperationCommand,
];