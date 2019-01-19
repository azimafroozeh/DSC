import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CarService {

  private carsUrl = 'http://127.0.0.1:4001/api/cars';


  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getCars (): Observable<Car[]> {
  return this.http.get<Car[]>(this.carsUrl)
    .pipe(
      tap(cars => this.log(`fetched cars`)),
      catchError(this.handleError('getCars', []))
    );
  }

  test (id: string): Observable<Car[]> {
  const url = 'http://127.0.0.1:4001/api/stations/' + id +'/cars';
  return this.http.get<Car[]>(url)
    .pipe(
      tap(cars => this.log(`fetched cars by station id`)),
      catchError(this.handleError('getCars', []))
    );
  }


  getCar(id: string): Observable<Car> {
  // TODO: send the message _after_ fetching the hero
  const url = `${this.carsUrl}/${id}`;
  return this.http.get<Car>(url).pipe(
    tap(_ => this.log(`fetched car id=${id}`)),
    catchError(this.handleError<Car>(`getCar id=${id}`))
  );
  }

  updateCar (car: Car): Observable<any> {
  return this.http.put(this.carsUrl, car, httpOptions).pipe(
    tap(_ => this.log(`updated car id=${car.id}`)),
    catchError(this.handleError<any>('carHero'))
  );
  }


  addCar (car: Car): Observable<Car> {
  return this.http.post<Car>(this.carsUrl, car, httpOptions).pipe(
    tap((car: Car) => this.log(`added car w/ id=${car.id}`)),
    catchError(this.handleError<Car>('addCar'))
  );}


  deleteCar (car: Car | number): Observable<Car> {
  const id = typeof car === 'number' ? car : car.id;
  const url = `${this.carsUrl}/${id}`;

  return this.http.delete<Car>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted car id=${id}`)),
    catchError(this.handleError<Car>('deleteCar'))
  );
 }

 searchCars(term: string): Observable<Car[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Car[]>(`http://127.0.0.1:4001/api/cars/?name=${term}`).pipe(
    tap(_ => this.log(`found cars matching "${term}"`)),
    catchError(this.handleError<Car[]>('searchCars', []))
  );
}
  private log(message: string) {
  this.messageService.add('CarService: ' + message);}

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
