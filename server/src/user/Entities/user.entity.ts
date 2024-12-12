import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from 'src/enums/roles';
import { EventRegistration } from 'src/event-registration/Entities/event-registration.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'text', nullable: false })
    public name: string;

    @Column({ type: 'text', nullable: false })
    public lastName: string;

    @Column({ type: 'text', nullable: false })
    public email: string;

    @Column({ type: 'text', nullable: false })
    public password: string;

    @Column({ type: 'text', nullable: false })
    public address: string;

    @Column({ type: 'text', nullable: true })
    public phoneNumber: string;

    @Column({ type: 'text', nullable: true })
    public imagePath: string;

    @Column({ type: 'text', nullable: false, default: Role.User })
    public role: string;

    @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.user)
    eventRegistrations: EventRegistration[];
}