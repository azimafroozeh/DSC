import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Station } from '../../../models/station';
import { StationService } from '../../../services/station.service';

@Component({
  selector: 'app-station-search',
  templateUrl: './station-search.component.html',
  styleUrls: ['./station-search.component.css']
})
export class StationSearchComponent implements OnInit {
  stations$: Observable<Station[]>;
  private searchTerms = new Subject<string>();

  constructor(private stationService: StationService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.stations$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.stationService.searchStations(term)),
    );
  }

}
