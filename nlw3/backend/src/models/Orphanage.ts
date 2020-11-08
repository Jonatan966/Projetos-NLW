import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';

import Image from './Images';
import User from './User';

@Entity('orphanages')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column({name: 'user_id'})
    @OneToOne(() => User, {
        cascade: ['remove']
    })
    @JoinColumn()
    user_id: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @Column({default: true})
    pending: boolean;

    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orphanage_id' })
    images: Image[];
}