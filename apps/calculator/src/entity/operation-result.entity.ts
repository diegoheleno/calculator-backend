import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class OperationResult extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;
    @Column() operationId: string;
    @Column() resultId: string;
}