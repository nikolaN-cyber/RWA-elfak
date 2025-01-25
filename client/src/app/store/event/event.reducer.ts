import { createReducer, on } from '@ngrx/store';
import { loadEvents, loadEventsSuccess, loadEventsFailure, loadEventById, loadEventByIdSuccess, loadEventByIdFailure } from './event.actions';
import { Event } from '../../Models/event.model';

export interface EventState {
  events: Event[];
  event: Event | null;  
  loading: boolean;
  error: any;
}

export const initialState: EventState = {
  events: [],
  event: null, 
  loading: false,
  error: null
};

export const eventReducer = createReducer(
  initialState,
  on(loadEvents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadEventsSuccess, (state, { events }) => {
    return {
      ...state,
      events: events,
      loading: false,
    };
  })
  ,
  on(loadEventsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(loadEventById, (state) => ({
    ...state,
    loading: true,  
    error: null,
  })),
  on(loadEventByIdSuccess, (state, { event }) => ({
    ...state,
    event: event,  
    loading: false,
  })),
  on(loadEventByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,  
  }))
);