import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/Entities/user.entity';
import { Event } from './event/Entities/event.entity';
import { Report } from './report/Entities/report.entity';
import { EventRegistration } from './event-registration/Entities/event-registration.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Nikola24@',
    database: 'Event_planner',
    entities: [User, Event, EventRegistration, Report],
    synchronize: true,
  }),
    TypeOrmModule.forFeature([User, Event, EventRegistration, Report]),
    UserModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
