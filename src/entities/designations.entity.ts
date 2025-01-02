import { Column, Entity } from "typeorm";
import BaseModel from "./base.model.entity";

@Entity()
export class Designations extends BaseModel {
    @Column()
    DesignationName: string

    @Column()
    Department: string

}