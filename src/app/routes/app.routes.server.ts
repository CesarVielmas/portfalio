//app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },
  {
    path:'login',
    renderMode:RenderMode.Client
  },
  {
    path: 'time-line',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'proyects',
    renderMode:RenderMode.Prerender
  }
];
