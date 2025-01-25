import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EventService } from '../../services/event.service';
import { loadEvents, loadEventsSuccess, loadEventsFailure, loadEventById, loadEventByIdSuccess, loadEventByIdFailure } from './event.actions';

@Injectable()
export class EventEffects {

  loadEvents$ = createEffect(() => this.actions$.pipe(
    ofType(loadEvents),
    mergeMap(() => {
      return from(this.eventService.getEvents()).pipe(
        map(events => {
          return loadEventsSuccess({ events });
        }),
        catchError(error => {
          return [loadEventsFailure({ error })];
        })
      );
    })
  ));

  loadEventById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEventById),  
      mergeMap((action) =>
        from(this.eventService.getEventById(action.id)).pipe(
          map((event) => loadEventByIdSuccess({ event })), 
          catchError((error) => of(loadEventByIdFailure({ error })))  
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private eventService: EventService
  ) { console.log('EventService:', eventService); }
}
