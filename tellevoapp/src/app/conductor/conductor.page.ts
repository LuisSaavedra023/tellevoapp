import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Map, marker, tileLayer } from 'leaflet';

//****prueba datos para ambas tablas */
export interface Passengers {
  nombre: string;
  direccion: string;
}
export interface PeriodicElement {
  nombre: string;
  direccion: string;
  tarifa: number;
}
//****prueba datos para ambas tablas */
@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
  
})

export class ConductorPage implements OnInit  {

  constructor() { }
  /**********Maps**********/
  showMap(){
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
  }
  /**********Maps**********/
  //creación de método para contar los caractéres de la patente.
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractéres restantes`;
  }
  //****prueba tabla inicio*/
  pasajeros: Passengers[] = [
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174'},
    {nombre: "Marcelo Perez", direccion: 'Calle siempre viva #174'},
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174'},
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174'},
    
  ];
  displayedPassengers: string[] = ['pasajero', 'direccion'];
  dataPassengers= new MatTableDataSource<Passengers>(this.pasajeros);
  //****prueba tabla inicio*/
  //****prueba tabla historial de viajes*/
  conductores: PeriodicElement[] = [
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
    {nombre: "Marcelo Perez", direccion: 'Calle siempre viva #174', tarifa: 1000},
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
    
  ];
  displayedColumns: string[] = ['pasajero', 'direccion', 'tarifa'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.conductores);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //****prueba tabla historial de viajes*/
  //*****prueba tablas */
  ngAfterViewInit() {
    this.showMap();
    /**table */
    this.dataSource.paginator = this.paginator;
    /**table */
  }
  //*****prueba tablas */
  //*** total de viajes realizados */
  totalRow(){
    //***se obtienen los datos del datasource. */
    var rows = this.dataSource.filteredData.length;
    
    return rows
  }
  ngOnInit() { }

}
