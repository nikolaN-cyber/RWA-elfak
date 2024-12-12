import { EventRegistration } from 'src/event-registration/Entities/event-registration.entity';
import { EventType } from 'src/event-type/Entities/event-type.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'text', nullable: false})
    public name: string;

    @Column({type: 'text', nullable: false})
    public description: string;

    @Column({type: 'text', nullable: false})
    public location: string;

    @Column({type: 'date', nullable: false})
    public date: Date;

    @Column({type: 'int', nullable: false})
    public capacity: number;

    @Column({type: 'int', default: 0})
    public registeredCount: number;

    @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.event)
    eventRegistrations: EventRegistration[];

    @ManyToOne(() => EventType, (eventType) => eventType.events)
    eventType: EventType;
}