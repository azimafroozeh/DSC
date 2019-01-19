import { Component, OnInit } from '@angular/core';
import { Station } from '../../models/station';
import { StationService } from '../../services/station.service';
@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  stations: Station[];

  constructor(private stationService: StationService) { }

  ngOnInit() {
    this.getStations();
  }

  getStations(): void {
    this.stationService.getStations()
      .subscribe(stations => this.stations = stations);
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.stationService.addStation({ name } as Station)
    .subscribe(station => {
      this.stations.push(station);
    });
}

delete(station: Station): void {
  this.stations = this.stations.filter(h => h !== station);
  this.stationService.deleteStation(station).subscribe();
  }
}
