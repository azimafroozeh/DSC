import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { CarService } from './services/car.service';
import { StationService } from './services/station.service';
import { BookingService } from './services/booking.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule }  from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarsComponent } from './components/cars/cars.component';
import { StationsComponent } from './components/stations/stations.component';
import { StationDetailComponent } from './components/stations/station-detail/station-detail.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { BookingDetailComponent } from './components/bookings/booking-detail/booking-detail.component';
import { SearchComponent } from './components/search/search.component';
import { CitySearchComponent } from './components/search/city-search/city-search.component';
import { RegisterComponent } from './components/user/register/register.component'
import { AuthService } from './services/auth.service';
import { AuthorizationInterceptorService } from './services/authorization-interceptor.service';
import { UnauthorizedInterceptorService } from './services/unauthorized-interceptor.service'
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StationSearchComponent } from './components/stations/station-search/station-search.component'
@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarDetailComponent,
    MessagesComponent,
    DashboardComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    CarsComponent,
    StationsComponent,
    StationDetailComponent,
    BookingsComponent,
    BookingDetailComponent,
    SearchComponent,
    CitySearchComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    StationSearchComponent
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
    BookingService,
    AuthService,
    AuthorizationInterceptorService,
   { provide: HTTP_INTERCEPTORS,
     useClass: AuthorizationInterceptorService,
     multi: true
   },
   { provide: HTTP_INTERCEPTORS,
     useClass: UnauthorizedInterceptorService,
     multi: true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
