import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Event } from "src/event/Entities/event.entity";

@Entity()
export class EventType {
    @PrimaryGeneratedColumn()
    public id:number;

    @Column({type: 'text', nullable: false})
    public type:string;

    @OneToMany(() => Event, (event) => event.eventType)
    events: Event[];
}