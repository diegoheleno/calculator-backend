import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Result {
    @PrimaryGeneratedColumn("uuid") id: string;
    @Column() stageId: string;
    @Column() value: number;
}