import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventModule } from "src/event/event.module";
import { EventRegistration } from "./Entities/event-registration.entity";
import { User } from "src/user/Entities/user.entity";
import { ErrorHandlerModule } from "src/errorHandler/error-handler.module";
import { UserModule } from "src/user/user.module";
import { EventRegistrationController } from "./event-registration.controller";
import { Event } from "src/event/Entities/event.entity";
import { EventRegistrationService } from "./event-registration.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([EventRegistration, User, Event]),
        EventModule,
        UserModule,
        ErrorHandlerModule],
    providers: [EventRegistrationService],
    controllers: [EventRegistrationController],
    exports: [EventRegistrationService]
})

export class EventRegistrationModule { }