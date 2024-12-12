import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./Entities/event.entity";
import { EventType } from "src/event-type/Entities/event-type.entity";
import { EventTypeModule } from 'src/event-type/event-type.module';
import { ErrorHandlerModule } from "src/errorHandler/error-handler.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, EventType]),
        EventTypeModule,
        ErrorHandlerModule],
    providers: [EventService],
    controllers: [EventController],
    exports: [EventService]
})

export class EventModule { }