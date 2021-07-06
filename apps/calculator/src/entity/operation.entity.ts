import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Operation {
    @PrimaryGeneratedColumn("uuid") id: string;
    @Column() stageId: string;
    @Column() action: number;
    @Column() value: number;
}