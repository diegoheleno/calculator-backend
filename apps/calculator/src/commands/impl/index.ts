import { CreateStageCommand } from './save-stage.command';
import { UpdateStageCommand } from './update-stage.command';
import { CreateResultCommand } from './save-result.command';
import { CreateOperationCommand } from './save-operation.command';
import { CreateActionCommand } from './save-action.command';
import { DeleteActionCommand } from './delete-action.command';
import { DeleteResultCommand } from './delete-result.command';
import { DeleteOperationCommand } from './delete-operation.command';

export const Commands = [
    CreateStageCommand,
    UpdateStageCommand,
    CreateResultCommand,
    CreateActionCommand,
    CreateOperationCommand,
    DeleteActionCommand,
    DeleteResultCommand,
    DeleteOperationCommand,
];