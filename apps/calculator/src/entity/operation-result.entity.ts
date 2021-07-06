import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class OperationResult {
    @PrimaryGeneratedColumn("uuid") id: string;
    @Column() operationId: string;
    @Column() resultId: string;
}