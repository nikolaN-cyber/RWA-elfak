import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventRegistration } from "./Entities/event-registration.entity";
import { EventRegistrationDTO } from "./DTOs/eventRegistrationDTO";
import { User } from "src/user/Entities/user.entity";
import { Event } from "src/event/Entities/event.entity";
import { ErrorHandlerService } from "src/errorHandler/error-handler.service";

@Injectable()
export class EventRegistrationService {
    constructor(
        @InjectRepository(EventRegistration)
        private readonly eventRegistrationRepository: Repository<EventRegistration>,
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly errorHandler: ErrorHandlerService
    ) { }

    async AddEventRegistration(eventRegistration: EventRegistrationDTO): Promise<EventRegistration> {
        try {
            const { userId, eventId } = eventRegistration;
            const user = await this.userRepository.findOneBy({ id: userId });
            const event = await this.eventRepository.findOneBy({ id: eventId });
            if (!user) {
                throw new NotFoundException("User with that id doesn't exist!");
            }
            if (!event) {
                throw new NotFoundException("Event with that id doen't exist!");
            }
            if (event.registeredCount >= event.capacity) {
                throw new BadRequestException('No available seats for this event');
            }
            const existingRegistration = await this.eventRegistrationRepository.findOne({
                where: { user: { id: userId }, event: { id: eventId } },
            });
            if (existingRegistration) {
                throw new BadRequestException("This user is already registered for this event!");
            }
            event.registeredCount += 1;
            await this.eventRepository.save(event);
            const date = new Date();
            const newEventRegistration = this.eventRegistrationRepository.create({
                registrationDate: date,
                user,
                event
            });
            return await this.eventRegistrationRepository.save(newEventRegistration);
        } catch (error) {
            this.errorHandler.internalServerError(error);
        }
    }

    async DeleteEventRegistration(id: number): Promise<void> {
        try {
            const eventRegistration = await this.eventRegistrationRepository.findOneBy({ id });
            if (!eventRegistration) {
                throw new NotFoundException("Event registration with that id doesn't exist!");
            }
            eventRegistration.event.registeredCount -= 1;
            await this.eventRepository.save(eventRegistration.event);
            await this.eventRegistrationRepository.remove(eventRegistration);
        } catch (error) {
            this.errorHandler.internalServerError(error);
        }
    }

    async GetEventRegistrationById(id: number): Promise<EventRegistration> {
        try {
            const eventRegistration = await this.eventRegistrationRepository.findOneBy({ id });
            if (!eventRegistration) {
                throw new NotFoundException("Event registration with that id doesn't exist!");
            }
            return eventRegistration;
        } catch (error) {
            this.errorHandler.internalServerError(error);
        }
    }

    async GetAllEventRegistrations(): Promise<EventRegistration[]> {
        return await this.eventRegistrationRepository.find();
    }
}