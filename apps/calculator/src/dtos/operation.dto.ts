import { ApiProperty } from "@nestjs/swagger";

export class FetchOperationQuery {
    @ApiProperty({ required: false }) id: string;
    @ApiProperty({ required: false }) stageId: string;
}

export class CreateOperationBody {
    @ApiProperty({ required: true }) stageId: string;
    @ApiProperty({ required: true }) action: number;
    @ApiProperty({ required: true }) value: number;
}
