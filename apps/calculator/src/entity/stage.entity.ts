import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Stage {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column() level: number
    @Column() start: number;
    @Column() end: number;
    @Column() moves: number;
    @Column() state: number;
}
