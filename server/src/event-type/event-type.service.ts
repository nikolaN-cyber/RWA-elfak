import { Injectable, BadRequestException, NotFoundException, ConflictException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventType } from './Entities/event-type.entity';
import { EventTypeDTO } from './DTOs/eventTypeDTO';
import { EventTypeUpdateDTO } from './DTOs/eventTypeUpdateDTO';

@Injectable()
export class EventTypeService {
    constructor(
        @InjectRepository(EventType)
        private eventTypeRepository : Repository<EventType>,
    ) {}

    async AddEventType(eventType : EventTypeDTO) : Promise<EventType> {
        const {type} = eventType;
        const existingType = await this.eventTypeRepository.findOneBy({type});
        if (existingType){
            throw new ConflictException("This event type is already added!");
        }
        const newEventType = this.eventTypeRepository.create({
            type,
        });
        return await this.eventTypeRepository.save(newEventType);
    }

    async DeleteEventType(id: number) : Promise<void> {
        const eventTypeToDelete = await this.eventTypeRepository.findOneBy({id});
        if (!eventTypeToDelete){
            throw new NotFoundException("Event type with requested Id doesn't exist");
        }
        await this.eventTypeRepository.remove(eventTypeToDelete);
    }

    async GetById(id: number) : Promise<EventType> {
        const eventType = await this.eventTypeRepository.findOneBy({id});
        if (!eventType){
            throw new NotFoundException("Event type with requested Id doesn't exist")
        }
        return eventType;
    }
    async UpdateEventType(eventType: EventTypeUpdateDTO) : Promise<EventType> {
        const {id, type} = eventType;
        const eventTypeToUpdate = await this.eventTypeRepository.findOneBy({id});
        if (!eventTypeToUpdate){
            throw new NotFoundException("Event type with requested Id doesn't exist");
        }
        const exististTypeEvent = await this.eventTypeRepository.findOneBy({type});
        if (exististTypeEvent){
            throw new ConflictException("This event type already exist");
        }
        eventTypeToUpdate.type = type;
        return await this.eventTypeRepository.save(eventTypeToUpdate);
    }

    async GetAllEventTypes() : Promise<EventType[]> {
        return this.eventTypeRepository.find();
    }
}