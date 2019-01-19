import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarService } from './services/car.service';
import { StationService } from './services/station.service';
import { BookingService } from './services/booking.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule }  from '@angular/common/http';
import { CarSearchComponent } from './car-search/car-search.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarsComponent } from './components/cars/cars.component';
import { StationsComponent } from './components/stations/stations.component';
import { StationDetailComponent } from './components/stations/station-detail/station-detail.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { BookingDetailComponent } from './components/bookings/booking-detail/booking-detail.component';
import { SearchComponent } from './components/search/search.component';
import { CitySearchComponent } from './components/search/city-search/city-search.component'

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarDetailComponent,
    MessagesComponent,
    DashboardComponent,
    CarSearchComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    CarsComponent,
    StationsComponent,
    StationDetailComponent,
    BookingsComponent,
    BookingDetailComponent,
    SearchComponent,
    CitySearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CarService,
    MessageService,
    StationService,
    BookingService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
