import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import Image from './Images';
import User from './User';

@Entity('orphanages')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column('decimal', {precision: 18, scale: 11})
    latitude: number;

    @Column('decimal', {precision: 18, scale: 11})
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @ManyToOne(() => User, user => user.orphanages, {
        cascade: ['remove']
    })
    user: User;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @Column({default: true})
    pending: boolean;

    @OneToMany(() => Image, image => image.orphanage, {cascade: true})
    images: Image[];
}