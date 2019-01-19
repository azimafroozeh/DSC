import { Component, OnInit, Input } from '@angular/core';
import { Station } from '../../../models/station';
import { Location } from '@angular/common';
import { Car } from '../../../models/car';
import { CarService } from '../../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { StationService }  from '../../../services/station.service';
@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css']
})
export class StationDetailComponent implements OnInit {

  @Input() station: Station;
  cars: Car[];

  constructor(
    private route: ActivatedRoute,
    private stationService: StationService,
    private carService: CarService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getStation();
    this.getCars();

  }
  getCars(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.carService.test(id)
      .subscribe(cars => this.cars = cars);
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.carService.addCar({ name } as Car)
    .subscribe(car => {
      this.cars.push(car);
    });
}

delete(car: Car): void {
  this.cars = this.cars.filter(h => h !== car);
  this.carService.deleteCar(car).subscribe();
  }

  getStation(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.stationService.getStation(id)
    .subscribe(station => this.station = station);
  }

  goBack(): void {
  this.location.back();
  }

  save(): void {
   this.stationService.updateStation(this.station)
     .subscribe(() => this.goBack());
  }
}
