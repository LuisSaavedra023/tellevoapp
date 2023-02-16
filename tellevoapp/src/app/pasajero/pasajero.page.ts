import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Map, marker, tileLayer } from 'leaflet';

import { AlertController } from '@ionic/angular';

//****prueba datos para ambas tablas */
export interface Passengers {
  nombrePasajero: string;
  direccionPasajero: string;
  tarifaPasajero: number;
}
export interface Drivers {
  nombre: string;
  patente: string;
  capacidad: number;
  tarifa: number;
  position: number
}
//****prueba datos para ambas tablas */
@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
  
})

export class PasajeroPage implements OnInit {
  
  constructor(private alertController: AlertController) { }
  //creación de método para contar los caractéres de la patente.
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractéres restantes`;
  }
  //*****prueba tabla inicio */
  conductores: Drivers[] = [
    {nombre: "Luis Saavedra", patente: 'lvuh93',capacidad: 2, tarifa: 1000, position: 1},
    {nombre: "Marcelo Perez", patente: 'lvuh93',capacidad: 2, tarifa: 1000, position: 2},
    {nombre: "Luis Saavedra", patente: 'lvuh93',capacidad: 2, tarifa: 1000, position: 3},
    {nombre: "Luis Saavedra", patente: 'lvuh93',capacidad: 2, tarifa: 1000, position: 4},
  ];

  displayedDrivers: string[] = ['conductor', 'patente','capacidad', 'tarifa', 'check'];
  dataDrivers= new MatTableDataSource<Drivers>(this.conductores);
  //***alias mat-paginator */
  @ViewChild('paginatorInit') paginatorInit: MatPaginator;
  //*****prueba tabla historial de viajes*/
  pasajeros: Passengers[] = [
    {nombrePasajero: "Luis Saavedra", direccionPasajero: 'Calle siempre viva 174', tarifaPasajero: 1000},
    {nombrePasajero: "Marcelo Perez", direccionPasajero: 'Calle siempre viva 174', tarifaPasajero: 1000},
    {nombrePasajero: "Luis Saavedra", direccionPasajero: 'Calle siempre viva 174', tarifaPasajero: 1000},
    {nombrePasajero: "Luis Saavedra", direccionPasajero: 'Calle siempre viva 174', tarifaPasajero: 1000},
    {nombrePasajero: "Luis Saavedra", direccionPasajero: 'Calle siempre viva 174', tarifaPasajero: 1000},
    {nombrePasajero: "Luis Saavedra", direccionPasajero: 'Calle siempre viva 174', tarifaPasajero: 1000},
  ];

  displayedColumns: string[] = ['pasajero', 'direccion', 'tarifa'];
  dataSource = new MatTableDataSource<Passengers>(this.pasajeros);

  @ViewChild('paginatorHistory') paginatorHistory: MatPaginator;

  //***prueba tabla historial de viajes */
  //*****checkbox */
  selection = new SelectionModel<Drivers>(false, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataDrivers.data.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataDrivers.data);
  }
  checkboxLabel(row?: Drivers): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  //*****checkbox */
  //*** total de viajes realizados */
  totalRow(){
    //***se obtienen los datos del datasource. */
    var rows = this.dataSource.filteredData.length;
    
    return rows
  }
  //*****prueba tablas */
  ngAfterViewInit() {
    this.showMap();
    /**table */
    this.dataDrivers.paginator = this.paginatorInit;
    this.dataSource.paginator = this.paginatorHistory;
    
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
  /**********alerts**********/
  //***input directions */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'DuocUc',
      // subHeader: 'Important message',
      message: '<span>Dirección ingresada con éxito.</span>',
      buttons: [{
        text: 'Ok',
        role: 'confirm'
      }],
      cssClass: 'alertCustomCss',
    });

    await alert.present();
  }
  //***init travel */
  async initTravel() {
    const alert = await this.alertController.create({
      header: 'DuocUc',
      // subHeader: 'Important message',
      message: '<span>Busca tu vehículo y espera a iniciar el viaje.</span>',
      buttons: [{
        text: 'Ok',
        role: 'confirm'
      }],
      cssClass: 'alertCustomCss',
    });

    await alert.present();
  }
  /**********alerts**********/

  ngOnInit() { }
  
}
