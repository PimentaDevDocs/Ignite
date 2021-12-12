// @ts-nocheck
import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("specification")
export class Specification {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt?: Date;

    constructor() {

        if (!this.id) {
            this.id = uuidV4();
        }
    }

}
