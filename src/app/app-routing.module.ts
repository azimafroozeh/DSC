import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { CarDetailComponent }  from './components/cars/car-detail/car-detail.component';
import { StationsComponent } from './components/stations/stations.component';
import { StationDetailComponent } from './components/stations/station-detail/station-detail.component';

const routes: Routes = [
  { path: 'cars/:id', component:  CarDetailComponent },
  { path: 'stations/:id', component: StationDetailComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'cars', component: CarsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stations', component: StationsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
