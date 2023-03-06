//interface student.
export interface Student {

    rut: string;
    name: string;
    last_name: string;
    email: string;
    password: number;
    campus: string;
    // insertStudent():void;
}
//interface for passenger.
export interface HistoryTravel {

  name: string;
  address: string;
  value: number;

}
//interface for travel.
export interface Travel {

    driver: string;
    patent: string;
    capacity: number;
    value: number;

}