import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Orphanage from "./Orphanage";

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({default: false})
    admin: boolean;

    @OneToMany(() => Orphanage, orphanage => orphanage.user)
    orphanages: Orphanage[];
}