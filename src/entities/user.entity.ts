import { Column, Entity } from "typeorm";
import BaseModel from "./base.model.entity";

@Entity()
export class User extends BaseModel {
    @Column()
    fullName: string

    @Column()
    email: string

    @Column()
    password: string

}