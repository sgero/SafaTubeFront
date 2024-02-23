import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';



import { routes } from './app.routes';
import {HttpClientModule, HttpHeaders, provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideAnimations(),provideHttpClient(), provideAnimationsAsync()]
};
