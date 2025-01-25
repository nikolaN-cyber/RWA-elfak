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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isDocker = configService.get<string>('ENV', 'local') === 'docker';
        return {
          type: 'postgres',
          host: isDocker
            ? configService.get<string>('DATABASE_HOST', 'db')
            : configService.get<string>('LOCAL_DATABASE_HOST', 'localhost'),
          port: configService.get<number>('DATABASE_PORT', 5432),
          username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
          password: configService.get<string>('DATABASE_PASSWORD', 'Nikola24@'),
          database: configService.get<string>('DATABASE_NAME', 'eventplanner'),
          entities: [User, Event, EventRegistration, EventType],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    EventTypeModule,
    EventModule,
    EventRegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
