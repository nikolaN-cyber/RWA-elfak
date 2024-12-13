import { Component, OnInit } from '@angular/core';
import { Event } from '../../Models/event.model';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
    events: Event[] = [];
    errorMessage: string = "";

    constructor(private eventService: EventService, private router: Router){}

    ngOnInit() :void {
      this.loadEvents();
    }

    async loadEvents() : Promise<void> {
      try {
        this.events = await this.eventService.getEvents();
      } catch (error) {
        this.errorMessage = "Error loading events!";
        console.log(error);
      }
    }
}
