import { ApiProperty } from "@nestjs/swagger";

export class FetchResultQuery {
    @ApiProperty({ required: false }) id: string;
    @ApiProperty({ required: false }) stageId: string;
}

export class CreateResultBody {
    @ApiProperty({ required: true }) stageId: string;
    @ApiProperty({ required: true }) value: number;
}

export class CreateOperationResultBody {
    @ApiProperty({ required: true }) resultId: string;
    @ApiProperty({ required: true }) operationId: string
}