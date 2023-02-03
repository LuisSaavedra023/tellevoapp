import { Component, OnInit, ViewChild, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Map, marker, tileLayer } from 'leaflet';

//****prueba datos para ambas tablas */
export interface PeriodicElement {
  nombre: string;
  direccion: string;
  tarifa: number;
}
export interface Passengers {
  nombre: string;
  patente: string;
  tarifa: number;
}
//****prueba datos para ambas tablas */
@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
  
})

export class PasajeroPage implements OnInit {
  
  constructor() { }
  //creación de método para contar los caractéres de la patente.
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractéres restantes`;
  }
  //*****prueba tabla historial de viajes*/
  pasajeros: PeriodicElement[] = [
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
    {nombre: "Marcelo Perez", direccion: 'Calle siempre viva #174', tarifa: 1000},
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
    {nombre: "Luis Saavedra", direccion: 'Calle siempre viva #174', tarifa: 1000},
  ];

  displayedColumns: string[] = ['pasajero', 'direccion', 'tarifa'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.pasajeros);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //***prueba tabla historial de viajes */
  //*****prueba tabla inicio */
  conductores: Passengers[] = [
    {nombre: "Luis Saavedra", patente: 'lvuh93', tarifa: 1000},
    {nombre: "Marcelo Perez", patente: 'lvuh93', tarifa: 1000},
    {nombre: "Luis Saavedra", patente: 'lvuh93', tarifa: 1000},
    {nombre: "Luis Saavedra", patente: 'lvuh93', tarifa: 1000},
  ];

  displayedDrivers: string[] = ['conductor', 'patente', 'tarifa'];
  dataDrivers= new MatTableDataSource<Passengers>(this.conductores);
  //***prueba tabla inicio */
  //*****prueba tablas */
  ngAfterViewInit() {
    this.showMap();
    /**table */
    this.dataSource.paginator = this.paginator;
    this.dataDrivers.paginator = this.paginator;
    /**table */
  }
  //*****prueba tablas */
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
  ngOnInit() { }
  
}
