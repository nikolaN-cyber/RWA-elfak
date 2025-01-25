import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Event } from '../Models/event.model';
import { error } from 'console';

@Injectable({
    providedIn: 'root',
})
export class EventService {

    async getEvents(): Promise<Event[]> {
        try {
            const response = await fetch(`${environment.api}/event/getAll`);
            if (!response.ok) {
                throw new Error("Failed to fetch events!");
            }
            const events: Event[] = await response.json();
            console.log('Fetched events:', events);
            return events;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }

    async getEventById(id: number): Promise<Event> {
        try {
            const response = await fetch(`${environment.api}/event/get/${id}`);
            if (!response.ok){
                throw new Error("Event not found!");
            }
            const event: Event = await response.json();
            return event;
        } catch (error) {
            console.error('Error fetching event:', error);
            throw error;
        }
    }
}