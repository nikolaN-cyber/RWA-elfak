import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Event } from '../Models/event.model';

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
            return events;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }
}