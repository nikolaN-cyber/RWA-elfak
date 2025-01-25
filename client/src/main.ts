import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { eventReducer } from './app/store/event/event.reducer';
import { provideEffects } from '@ngrx/effects';
import { EventEffects } from './app/store/event/event.effects';
import { EventService } from './app/services/event.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({events: eventReducer}),
    provideEffects([EventEffects]),
    EventService,
    ...appConfig.providers,
  ],
})
  .catch((err) => console.error(err));


