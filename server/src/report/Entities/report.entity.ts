import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/Entities/user.entity';

@Entity()
export class Report {
    
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'text', nullable: true})
    public description: string;

    @ManyToOne(()=>User, (user)=>user.reports)
    public userReports: User;
}