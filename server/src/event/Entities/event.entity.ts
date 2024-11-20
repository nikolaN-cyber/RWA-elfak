import { EventRegistration } from 'src/event-registration/Entities/event-registration.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity()

export class Event {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'text', nullable: false})
    public name: string;

    @Column({type: 'text', nullable: false})
    public location: string;

    @Column({type: 'date', nullable: false})
    public date: Date;

    @Column({type: 'int', nullable: false})
    public capacity: number;

    @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.event)
    eventRegistrations: EventRegistration[];
}