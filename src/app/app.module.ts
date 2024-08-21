import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.router';

import { RoomService } from './room.service';
//import { SearchComponent } from './search/search.component';
import { YourComponent } from './your-component/your-component.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ResortDetailComponent } from './resort-detail/resort-detail.component';
import { NavComponent } from './nav/nav.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { PaymentComponent } from './payment/payment.component';
import { AllDetailsComponent } from './all-details/all-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { YourService } from './your-service.service';




@NgModule({
  declarations: [
    AppComponent,   
    YourComponent,
   ChartComponent,
   LandingPageComponent,
   HomeComponent,
   NotfoundComponent,
   ResortDetailComponent,
   NavComponent,
   CustomerDetailsComponent,
   PaymentComponent,
   AllDetailsComponent,
       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routes
    
  ],
  providers: [RoomService,YourService],
  bootstrap: [AppComponent]
})
export class AppModule { }
