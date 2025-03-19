import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './app-data';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    /**
     * Configura el módulo de la API web en memoria para que use los datos de la aplicación.
     */
    importProvidersFrom(InMemoryWebApiModule.forRoot(AppData, { delay: 1000 })),
    provideRouter(routes),
  ],
};
