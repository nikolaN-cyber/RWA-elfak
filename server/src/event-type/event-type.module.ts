import { Module } from "@nestjs/common";
import { EventTypeController } from "./event-type.controller";
import { EventTypeService } from "./event-type.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventType } from "./Entities/event-type.entity";

@Module({
    imports: [TypeOrmModule.forFeature([EventType])],
    providers: [EventTypeService],
    controllers: [EventTypeController],
    exports: [EventTypeService]
})

export class EventTypeModule {}