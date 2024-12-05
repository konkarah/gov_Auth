import { Column, Entity } from "typeorm";
import BaseModel from "./base.model.entity";

@Entity()
export class Systems extends BaseModel {
    @Column()
    SystemName: string

    @Column()
    SystemURL: string

}