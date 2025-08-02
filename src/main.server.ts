import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { HomeLayout } from '@app/layouts/home-layout/home-layout.component';
import { App } from '@app/app';

const bootstrap = () => bootstrapApplication(App, config);

export default bootstrap;
