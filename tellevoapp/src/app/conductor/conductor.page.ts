import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
  
})

export class ConductorPage implements OnInit  {

  constructor() { }
  //creación de método para contar los caractéres de la patente.
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractéres restantes`;
  }
  //****prueba */
  
  displayedColumns: string[] = ['pasajero', 'direccion', 'tarifa'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  //****prueba */

  ngOnInit() {
  }
  

}
//***prueba */
export interface PeriodicElement {
  nombre: string;
  direccion: string;
  tarifa: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
  {nombre: "Marcelo Perez", direccion: 'Calle siempre viva #174', tarifa: 1000},
  {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
  {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
  {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
  {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
  {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
  
];
//***prueba */
//***prueba */

//***prueba */
