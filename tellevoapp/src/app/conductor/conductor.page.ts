import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Map, marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';


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
    /**maps */
    //cargado de mapa con las coordenadas de inicio.
    const map = new Map('map').setView([-33.59901, -70.5784], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    //**********Marker**********/
    marker([-33.59901, -70.5784]).addTo(map).bindPopup("Duoc Uc Puente Alto").openPopup();
    //**********Marker**********/
    //renderización del 100% del mapa en el contenedor (div)
    map.whenReady(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    });
    /**maps */
    /**table */
    this.dataSource.paginator = this.paginator;
    /**table */
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
