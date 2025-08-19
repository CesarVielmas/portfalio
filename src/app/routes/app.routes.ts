//app.routes.ts
import { Routes } from '@angular/router';
import { ContactPresentationComponent } from '@app/features/contact-presentation/contact-presentation.component';
import { HomePresentationComponent } from '@app/features/home-presentation/home-presentation.component';
import { AuthLayout } from '@app/layouts/auth-layout/auth-layout.component';
import { HomeLayout } from '@app/layouts/home-layout/home-layout.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeLayout,
        children:[
            {path:'',component:HomePresentationComponent},
            {path:'contact',component:ContactPresentationComponent}
        ]
    },
    {
        path:'login',
        component:AuthLayout
    }
];
