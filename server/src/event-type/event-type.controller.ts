import { Controller, Post, Body, Delete, Param, Get, Put } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { EventTypeDTO } from './DTOs/eventTypeDTO';
import { EventTypeUpdateDTO } from './DTOs/eventTypeUpdateDTO';

@Controller('event-type')
export class EventTypeController{
    constructor(private readonly eventTypeService: EventTypeService) {}

    @Post('add')
    async addEventType(@Body() eventType: EventTypeDTO){
        return this.eventTypeService.AddEventType(eventType);
    }
    @Delete('delete/:id')
    async deleteEventType(@Param('id') id:number ){
        return this.eventTypeService.DeleteEventType(id);
    }
    @Get('get/:id')
    async getEventTypeById(@Param('id') id:number){
        return this.eventTypeService.GetById(id);
    }
    @Put('update')
    async updateEventType(@Body() eventType: EventTypeUpdateDTO){
        return this.eventTypeService.UpdateEventType(eventType)
    }
    @Get('getAll')
    async getAllEventTypes(){
        return this.eventTypeService.GetAllEventTypes();
    }
}