import { ApiProperty } from "@nestjs/swagger";

export class FetchActionQuery {
    @ApiProperty({ required: false }) id: string;
    @ApiProperty({ required: false }) resultId: string;
}

export class CreateActionBody {
    @ApiProperty({ required: true }) operationId: string;
    @ApiProperty({ required: true }) resultId: string;
}