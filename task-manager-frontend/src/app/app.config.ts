// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <-- Add this import

import { routes } from './app.routes'; // Your existing routes

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // <-- Add this line
    // You might also add other global providers here, e.g., for interceptors, if needed later.
  ]
};