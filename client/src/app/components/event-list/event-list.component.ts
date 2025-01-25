import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectAllEvents, selectEventError, selectEventLoading } from '../../store/event/event.selector';
import { Store } from '@ngrx/store';
import { loadEvents } from '../../store/event/event.actions';
import { Event } from '../../Models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events$: Observable<Event[]> = this.store.select(selectAllEvents);
  errorMessage$: Observable<string | null> = this.store.select(selectEventError);
  loading$: Observable<boolean> = this.store.select(selectEventLoading);

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    console.log('Dispatching loadEvents action');
    this.store.dispatch(loadEvents());
  }

  goToEventDetail(eventId: number): void {
    if (eventId !== undefined) {
      this.router.navigate(['/event', eventId]);
    }
  }
}
