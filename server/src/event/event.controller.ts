import { Controller, Body, Param, Get, Post, Put, Delete, Query } from "@nestjs/common";
import { EventDTO } from "./DTOs/eventDTO";
import { EventUpdateDTO } from "./DTOs/eventUpdateDTO";
import { EventService } from "./event.service";
import { EventFilterDTO } from "./DTOs/eventFilterDTO";

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Get('get/:id')
    async getEventById(@Param('id') id: number) {
        return this.eventService.GetEventById(id);
    }
    @Post('add')
    async addEvent(@Body() event: EventDTO) {
        return this.eventService.AddEvent(event)
    }
    @Delete('delete/:id')
    async deleteEvent(@Param('id') id: number) {
        return this.eventService.DeleteEvent(id);
    }
    @Put('update')
    async updateEvent(@Body() event: EventUpdateDTO) {
        return this.eventService.UpdateEvent(event);
    }
    @Get('getAll')
    async getAllEvents() {
        return this.eventService.GetAllEvents();
    }
    @Get('getFiltered')
    async getFilteredEvents(@Query() filter: EventFilterDTO) {
        return this.eventService.FilterEvents(filter);
    }
    @Get('getFilteredByEventTypeId')
    async getEvents(@Query('eventTypes') eventTypes: string) {
        const eventTypeIds = eventTypes.split(',').map(id => Number(id));
        return this.eventService.FilterEventsByEventTypeId(eventTypeIds); 
    }
}