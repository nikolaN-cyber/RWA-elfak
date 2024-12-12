import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/Entities/user.entity';
import { Event } from './event/Entities/event.entity';
import { EventRegistration } from './event-registration/Entities/event-registration.entity';
import { UserModule } from './user/user.module';
import { EventType } from './event-type/Entities/event-type.entity';
import { AuthModule } from './auth/auth.module';
import { EventTypeModule } from './event-type/event-type.module';
import { EventModule } from './event/event.module';
import { EventRegistrationModule } from './event-registration/event-registration.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Nikola24@',
    database: 'Event_planner',
    entities: [User, Event, EventRegistration, EventType],
    synchronize: true,
  }),
    UserModule,
    AuthModule,
    EventTypeModule,
    EventModule,
    EventRegistrationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
