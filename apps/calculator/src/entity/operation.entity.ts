import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Operation extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;
    @Column() stageId: string;
    @Column() type: string;
    @Column() value: number;
}