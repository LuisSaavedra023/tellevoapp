import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Map, marker, tileLayer } from 'leaflet';

import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';

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
  
  constructor(private alertController: AlertController, public route: Router, private toastController: ToastController) { }
  //creación de método para contar los caractéres de la patente.
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractéres restantes`;
  }
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
  /**********alerts**********/
  //***mensajes toast */
  messageCancelTravel = '<span>Viaje cancelado.</span>';
  messageReport = '<span>Reporte enviado.</span>';
  messageRegister = '<span>Alumno insertado.</span>'

  messageToast(message: string){

    let mensaje = message;

    return mensaje;
  }
  //toast messaje recibe por parámetro el mensaje y el ícono.
  async Toast(mensaje: string, icono: string ) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 750,
      position: 'middle',
      icon: icono,
      cssClass: 'custom-toast'
    });

    await toast.present();
  }
  //***mensajes toast */
  //alert que contiene la modificación de la tarifa y el inicio del viaje.
  async presentAlert(message : string) {
    const alert = await this.alertController.create({
      header: 'DuocUc',
      message: message,
      buttons: [{
        text: 'Ok',
        cssClass: 'alert-button-confirm',
          
      }],
      cssClass: 'alertCustomCss',
    });

    await alert.present();
  }
  //***cancel */
  async cancelTravel() {
   
    const alert = await this.alertController.create({
      header: 'DuocUc',
      message: '<span>¿Seguro que deseas cancelar tu viaje?</span>',
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
          handler: (x => setTimeout(() => {
            this.Toast(this.messageCancelTravel, 'close')
          }, 500))
        },
        {
          text: 'Cancelar',
          cssClass: 'alert-button-cancel',
        },
      ],
    });

    await alert.present();
  }
  //***exit */
  async alertExit() {
   
    const alert = await this.alertController.create({
      header: 'DuocUc',
      subHeader: '¿Seguro que deseas salir?',
      message: '<span>Si estás en espera de un viaje, éste se cancelará.</span>',
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.route.navigate(['/home'])
          }
        },
        {
          text: 'Cancelar',
          cssClass: 'alert-button-cancel',
        },
      ],
    });

    await alert.present();
  }
  //***report */
  async alertReport() {
    const alert = await this.alertController.create({
      header: 'DuocUc',
      cssClass: 'alertCustomCss',
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Tienes un límite de 100 carácteres',
          attributes: {
            minlenght:10,
            maxlength: 100,
          },
        },
      ],
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
          handler: ((x => {
            
            var longitud = Object.values(x);

            if (longitud.toString().length > 0 ) {
              this.Toast(this.messageReport, 'clipboard')
            }
            
          })) 
          
        },
        {
          text: 'Cancelar',
          cssClass: 'alert-button-cancel',
        },
      ],
      
    });

    await alert.present();
  }
  //***register */
  async alertRegister() {
    const alert = await this.alertController.create({
      header: 'DuocUc',
      cssClass:'alertCustomCss',
      inputs: [
        { 
          type: 'text',
          placeholder: 'Rut',
          attributes: {
            minlength: 10,
            maxlength: 10,
          },
        },
        { 
          type: 'text',
          placeholder: 'Nombre',
          attributes: {
            minlength: 2,
            maxlength: 15,
          },
        },
        { 
          type: 'text',
          placeholder: 'Apellido',
          attributes: {
            minlength: 2,
            maxlength: 15,
          },
        },
        { 
          type: 'text',
          placeholder: 'Email',
          attributes: {
            minlength: 5,
            maxlength: 40,
          },
        },
        { 
          type: 'text',
          placeholder: 'Sede',
          attributes: {
            minlength: 5,
            maxlength: 20,
          },
        }
      ],
      buttons: [
        {
          text: 'Registrar',
          cssClass: 'alert-button-confirm',
          handler: (x => setTimeout(() => {
            this.Toast(this.messageToast(this.messageRegister), 'cloud')
          }, 500))
        },
      ],
    });

    await alert.present();
  }
  /**********alerts**********/

  ngOnInit() { }
  
}
