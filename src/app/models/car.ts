export class Car {
  //filed
  id: string;
  stationId: string;
  rent: number;
  booked: boolean;
  brand: string;
  model: string;
  color: string;
  totalSeats: number;
  year: number;
  gearBox: string;
  fuelType: string;

  //constructor
  constructor(stationId:string, model:string){
    this.stationId = stationId;
    this.model = model;
  }

}
