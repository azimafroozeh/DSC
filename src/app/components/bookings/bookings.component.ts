import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/booking.service';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.getBookings();
  }

  getBookings(): void {
    this.bookingService.getBookings()
      .subscribe(bookings => this.bookings = bookings);
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.bookingService.addBooking({ name } as Booking)
    .subscribe(booking => {
      this.bookings.push(booking);
    });
}

delete(booking: Booking): void {
  this.bookings = this.bookings.filter(h => h !== booking);
  this.bookingService.deleteBooking(booking).subscribe();
  }
}
