import { Component } from '@angular/core';
import { Event } from '../../Models/event.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllEvents, selectEventById, selectEventError, selectEventLoading } from '../../store/event/event.selector';
import { loadEventById } from '../../store/event/event.actions';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  event$: Observable<Event | null> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  eventId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.eventId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.store.dispatch(loadEventById({ id: this.eventId }));

    this.event$ = this.store.select(selectEventById(this.eventId));
    this.loading$ = this.store.select(selectEventLoading);
    this.error$ = this.store.select(selectEventError);
  }

  goBack() : void {
    this.location.back();
  }

}
