import { Column, Entity } from "typeorm";
import BaseModel from "./base.model.entity";

@Entity()
export class Roles extends BaseModel {
    @Column()
    RoleName: string

}