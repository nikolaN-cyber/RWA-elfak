import { Controller, Body, Param, Get, Post, Put, Delete} from "@nestjs/common";
import { EventRegistrationDTO } from "./DTOs/eventRegistrationDTO";
import { EventRegistrationService } from "./event-registration.service";

@Controller("event-registration")
export class EventRegistrationController{
    constructor(private readonly eventRegistrationService : EventRegistrationService) {}

    @Post('add')
    async addEventRegistration(@Body() eventRegistration : EventRegistrationDTO){
        return this.eventRegistrationService.AddEventRegistration(eventRegistration);
    }

    @Get('get/:id')
    async getEventRegistrationById(@Param('id') id:number){
        return this.eventRegistrationService.GetEventRegistrationById(id);
    }

    @Delete('delete/:id')
    async deleteEventRegistration(@Param('id') id:number){
        return this.eventRegistrationService.DeleteEventRegistration(id);
    }

    @Get('getAll')
    async getAllEventRegistrations() {
        return this.eventRegistrationService.GetAllEventRegistrations();
    }
}