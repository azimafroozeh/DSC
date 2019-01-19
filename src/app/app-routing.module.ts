import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component'
import { DashboardComponent }   from './dashboard/dashboard.component';
import { CarDetailComponent }  from './car-detail/car-detail.component';
const routes: Routes = [
  { path: 'detail/:id', component:  CarDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'cars', component: CarsComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
