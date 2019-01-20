import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../../../models/car';
import { Booking } from '../../../models/booking';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CarService }  from '../../../services/car.service';
import { BookingService} from '../../../services/booking.service'
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  @Input() car: Car;
  carId = this.route.snapshot.paramMap.get('id');
  booking: Booking;
  test1: Booking;


  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private location: Location,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.getCar();
  }

  getCar(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.carService.getCar(id)
    .subscribe(car => this.car = car );
  this.carService.getCar(id)
    .subscribe(() => this.test());
  }

  test(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.test1 = new Booking(this.car.stationId,'azimtest1',this.carId);
    this.booking =  this.test1;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.carService.updateCar(this.car)
     .subscribe(() => this.goBack());
  }

  book(): void {

    //const id = this.route.snapshot.paramMap.get('id');
    //this.bookingId = id;
    //this.booking.stationId = 'sdgsgs';
    //this.booking.customerId = 'sdgsgs';
    //console.log("sdgs"):
    this.bookingService.addBooking(this.booking)
      .subscribe(() => this.goBack());
  }
}
