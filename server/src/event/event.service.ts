import { Event } from "./Entities/event.entity";
import { EventDTO } from "./DTOs/eventDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { EventType } from "src/event-type/Entities/event-type.entity";
import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { EventUpdateDTO } from "./DTOs/eventUpdateDTO";
import { ErrorHandlerService } from "src/errorHandler/error-handler.service";
import { EventFilterDTO } from "./DTOs/eventFilterDTO";

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        @InjectRepository(EventType)
        private readonly eventTypeRepository: Repository<EventType>,
        private readonly errorHandler: ErrorHandlerService
    ) { }

    async AddEvent(event: EventDTO): Promise<Event> {
        try {
            const { name, description, location, date, capacity, eventTypeId } = event;
            const currentDate = new Date()
            if (date < currentDate) {
                throw new BadRequestException("Event date cannot be in the past!");
            }
            const eventType = await this.eventTypeRepository.findOneBy({ id: eventTypeId });
            if (!eventType) {
                throw new NotFoundException("That event type doesn't exist!");
            }
            const newEvent = this.eventRepository.create({
                name,
                description,
                location,
                date,
                capacity,
                eventType
            });
            return await this.eventRepository.save(newEvent);
        } catch (error) {
            this.errorHandler.internalServerError(error);
        }
    }

    async GetEventById(id: number): Promise<Event> {
        try {
            const event = await this.eventRepository.findOneBy({ id });
            if (!event) {
                throw new NotFoundException("Event with this id doesn't exist!");
            }
            return event;
        } catch (error) {
            this.errorHandler.internalServerError(error);
        }
    }

    async DeleteEvent(id: number): Promise<void> {
        try {
            const deleteEvent = await this.eventRepository.findOneBy({ id });
            if (!deleteEvent) {
                throw new NotFoundException("Event with this id doesn't exist!");
            }
            await this.eventRepository.remove(deleteEvent);

        } catch (error) {
            this.errorHandler.internalServerError(error);
        }
    }

    async UpdateEvent(updateEvent: EventUpdateDTO): Promise<Event> {
        try {
            const { id, name, description, location, date, capacity } = updateEvent;
            const currentDate = new Date();
            if (date < currentDate) {
                throw new BadRequestException("Event date cannot be in the past!");
            }
            const event = await this.eventRepository.findOneBy({ id });
            if (!event) {
                throw new NotFoundException("Event with this id doesn't exist!")
            }
            event.name = name;
            event.description = description;
            event.location = location;
            event.date = date;
            event.capacity = capacity;
            return await this.eventRepository.save(event);
        } catch (error) {
            this.errorHandler.internalServerError(error);
        }
    }

    async GetAllEvents(): Promise<Event[]> {
        return this.eventRepository.find();
    }

    async FilterEvents(filter: EventFilterDTO): Promise<Event[]> {
        const { name, minDate, maxDate, minCapacity, maxCapacity } = filter;
        const query = this.eventRepository.createQueryBuilder('event');
        if (name) {
            query.andWhere('event.name LIKE :name', { name: `%${name}%` });
        }
        if (minDate) {
            query.andWhere('event.date >= :minDate', { minDate });
        }
        if (maxDate) {
            query.andWhere('event.date <= :maxDate', { maxDate });
        }
        if (minCapacity) {
            query.andWhere('event.capacity >= :minCapacity', { minCapacity });
        }
        if (maxCapacity) {
            query.andWhere('event.capacity <= :maxCapacity', { maxCapacity });
        }
        const events = await query.getMany();
        return events;
    }

    async FilterEventsByEventTypeId(eventTypeIds: number[]) : Promise<Event[]> {
        return await this.eventRepository.find({
            where: {
              eventType: { id: In(eventTypeIds) },
            },
          });
    }
}