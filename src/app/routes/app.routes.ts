//app.routes.ts
import { Routes } from '@angular/router';
import { ContactPresentationComponent } from '@app/features/contact-presentation/contact-presentation.component';
import { DeploymentPresentationComponent } from '@app/features/deployment-presentation/deployment-presentation.component';
import { HomePresentationComponent } from '@app/features/home-presentation/home-presentation.component';
import { ProjectsPresentationComponent } from '@app/features/projects-presentation/projects-presentation.component';
import { AuthLayout } from '@app/layouts/auth-layout/auth-layout.component';
import { HomeLayout } from '@app/layouts/home-layout/home-layout.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeLayout,
        children:[
            {path:'',component:HomePresentationComponent},
            {path:'contact',component:ContactPresentationComponent},
            {path:'time-line',component:DeploymentPresentationComponent},
            {path:'proyects',component:ProjectsPresentationComponent}
        ]
    },
    {
        path:'login',
        component:AuthLayout
    }
];
