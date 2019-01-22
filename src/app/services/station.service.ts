import { Injectable } from '@angular/core';
import { Station } from '../models/station';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StationService {

  private stationsUrl = 'http://127.0.0.1:4001/api/stations';


  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getStations (): Observable<Station[]> {
    return this.http.get<Station[]>(this.stationsUrl)
      .pipe(
        tap(stations => this.log(`fetched stations`)),
        catchError(this.handleError('getStations', []))
      );
  }


  getStation(id: string): Observable<Station> {
    // TODO: send the message _after_ fetching the hero
    const url = `${this.stationsUrl}/${id}`;
    return this.http.get<Station>(url).pipe(
      tap(_ => this.log(`fetched station id=${id}`)),
      catchError(this.handleError<Station>(`getStation id=${id}`))
    );
  }

  updateStation (station: Station): Observable<any> {
    return this.http.put(this.stationsUrl, station, httpOptions).pipe(
      tap(_ => this.log(`updated station id=${station.id}`)),
      catchError(this.handleError<any>('stationHero'))
    );
  }


  addStation (station: Station): Observable<Station> {
    return this.http.post<Station>(this.stationsUrl, station, httpOptions).pipe(
      tap((station: Station) => this.log(`added station w/ id=${station.id}`)),
      catchError(this.handleError<Station>('addStation'))
    );}


  deleteStation (station: Station | number): Observable<Station> {
    const id = typeof station === 'number' ? station : station.id;
    const url = `${this.stationsUrl}/${id}`;

    return this.http.delete<Station>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted station id=${id}`)),
      catchError(this.handleError<Station>('deleteStation'))
    );
  }

  searchStations(term: string): Observable<Station[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Station[]>(`http://127.0.0.1:4001/api/stations?filter[where][name][like]=${term}`).pipe(
      tap(_ => this.log(`found stations matching "${term}"`)),
      catchError(this.handleError<Station[]>('searchStations', []))
    );
  }
  private log(message: string) {
    this.messageService.add('StationService: ' + message);}

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
