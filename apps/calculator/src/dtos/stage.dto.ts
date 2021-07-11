import { ApiProperty } from "@nestjs/swagger";

export class FetchStageQuery {
    @ApiProperty({ required: false }) id?: string;
    @ApiProperty({ required: false }) level?: number;
}

export class CreateStageBody {
    @ApiProperty({ required: true }) level: number;
    @ApiProperty({ required: true }) start: number;
    @ApiProperty({ required: true }) end: number;
    @ApiProperty({ required: true }) moves: number;
    @ApiProperty({ required: true }) state: number;
}

export class UpdateStageBody {
    @ApiProperty({ required: true }) id: string;
    @ApiProperty({ required: false }) level: number;
    @ApiProperty({ required: false }) start: number;
    @ApiProperty({ required: false }) end: number;
    @ApiProperty({ required: false }) moves: number;
    @ApiProperty({ required: false }) state: number;
}

export class CreateResultBody {
    @ApiProperty({ required: true }) stageId: string;
    @ApiProperty({ required: true }) value: number;
}

export class CreateOperationResultBody {
    @ApiProperty({ required: true }) resultId: string;
    @ApiProperty({ required: true }) operationId: string
}