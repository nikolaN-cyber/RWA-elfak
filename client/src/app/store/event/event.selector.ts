import { createSelector } from '@ngrx/store';
import { EventState } from './event.reducer';
import { Event } from '../../Models/event.model';

export const selectEventState = (state: any) => {
    console.log('selectEventState:', state.events);
    return state.events;
}

export const selectAllEvents = createSelector(
    selectEventState,
    (state: EventState) => {
        console.log('Selecting all events:', state?.events);
        return state?.events || []
    }
);

export const selectEventById = (id: number) => createSelector(
    selectEventState,
    (state: EventState) => {
        return state.events.find((event: Event) => event.id === id) || null;
    }
)

export const selectEventLoading = createSelector(
    selectEventState,
    (state: EventState) => state?.loading || false
);

export const selectEventError = createSelector(
    selectEventState,
    (state: EventState) => state?.error || null
);
