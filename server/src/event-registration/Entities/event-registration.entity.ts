import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/Entities/user.entity';
import { Event } from 'src/event/Entities/event.entity';

@Entity()
export class EventRegistration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
    public registrationDate: Date;

    @ManyToOne(() => User, (user) => user.eventRegistrations)
    user: User;

    @ManyToOne(() => Event, (event) => event.eventRegistrations)
    event: Event;
}