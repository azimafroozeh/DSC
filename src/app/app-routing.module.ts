import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { CarDetailComponent }  from './components/cars/car-detail/car-detail.component';
import { StationsComponent } from './components/stations/stations.component';
import { StationDetailComponent } from './components/stations/station-detail/station-detail.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { BookingDetailComponent } from './components/bookings/booking-detail/booking-detail.component';

const routes: Routes = [
  { path: 'cars/:id', component:  CarDetailComponent },
  { path: 'stations/:id', component: StationDetailComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'cars', component: CarsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stations', component: StationsComponent},
  { path: 'bookings', component: BookingsComponent},
  { path: 'bookings/:id', component: BookingDetailComponent},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
