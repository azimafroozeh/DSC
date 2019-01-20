export class Booking {
  //field
  id: string;
  customerId: string;
  stationId: string;
  carId: string;
  price: number;
  description: string;
  pickupDate: Date;
  dropoffDate: Date;
  name: string;

  //constructor
  constructor(stationId:string, customerId:string, carId:string){
    this.stationId = stationId;
    this.carId = carId;
    this.customerId = customerId;
  }

}
