import { Routes, RouterModule } from '@angular/router'; 

import { HomeComponent } from './home/home.component';
import { YourComponent } from './your-component/your-component.component';
import { ResortDetailComponent } from './resort-detail/resort-detail.component';
import { AllDetailsComponent } from './all-details/all-details.component';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, //default page
    { path: 'home', component: HomeComponent },
    { path: 'reservation', component: YourComponent },
    { path: 'resort-detail', component: ResortDetailComponent },
    {path: 'reservation/allDetails', component: AllDetailsComponent}
      
];


export const routes = RouterModule.forRoot(router);