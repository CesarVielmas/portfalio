import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomeLayout } from '@app/layouts/home-layout/home-layout.component';
import { App } from '@app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
