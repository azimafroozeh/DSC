import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BookingService {

  private bookingsUrl = 'http://127.0.0.1:4001/api/bookings';


  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getBookings (): Observable<Booking[]> {
  return this.http.get<Booking[]>(this.bookingsUrl)
    .pipe(
      tap(bookings => this.log(`fetched bookings`)),
      catchError(this.handleError('getBookings', []))
    );
  }

  test (id: string): Observable<Booking[]> {
  const url = 'http://127.0.0.1:4001/api/stations/' + id +'/bookings';
  return this.http.get<Booking[]>(url)
    .pipe(
      tap(bookings => this.log(`fetched bookings by station id`)),
      catchError(this.handleError('getBookings', []))
    );
  }


  getBooking(id: string): Observable<Booking> {
  // TODO: send the message _after_ fetching the hero
  const url = `${this.bookingsUrl}/${id}`;
  return this.http.get<Booking>(url).pipe(
    tap(_ => this.log(`fetched booking id=${id}`)),
    catchError(this.handleError<Booking>(`getBooking id=${id}`))
  );
  }

  updateBooking (booking: Booking): Observable<any> {
  return this.http.put(this.bookingsUrl, booking, httpOptions).pipe(
    tap(_ => this.log(`updated booking id=${booking.id}`)),
    catchError(this.handleError<any>('bookingHero'))
  );
  }


  addBooking (booking: Booking): Observable<Booking> {
  return this.http.post<Booking>(this.bookingsUrl, booking, httpOptions).pipe(
    tap((booking: Booking) => this.log(`added booking w/ id=${booking.id}`)),
    catchError(this.handleError<Booking>('addBooking'))
  );}


  deleteBooking (booking: Booking | number): Observable<Booking> {
  const id = typeof booking === 'number' ? booking : booking.id;
  const url = `${this.bookingsUrl}/${id}`;

  return this.http.delete<Booking>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted booking id=${id}`)),
    catchError(this.handleError<Booking>('deleteBooking'))
  );
 }

 searchBookings(term: string): Observable<Booking[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Booking[]>(`http://127.0.0.1:4001/api/bookings/?name=${term}`).pipe(
    tap(_ => this.log(`found bookings matching "${term}"`)),
    catchError(this.handleError<Booking[]>('searchBookings', []))
  );
}
  private log(message: string) {
  this.messageService.add('BookingService: ' + message);}

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
