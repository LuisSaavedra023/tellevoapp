import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Map, marker, tileLayer } from 'leaflet';

import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';

import {MapService} from 'src/app/services/map.service'

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
  providers: [[MapService]]
})

export class ConductorPage implements OnInit  {

  constructor(private alertController: AlertController, public route: Router, private toastController: ToastController, private mapService: MapService) { }
  /**********Maps**********/
  // showMap(){
  //   //cargado de mapa con las coordenadas de inicio.
  //   const map = new Map('map').setView([-33.59901, -70.5784], 13);
  //   tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 19,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //   }).addTo(map);
  //   //**********Marker**********/
  //   marker([-33.59901, -70.5784]).addTo(map).bindPopup("Duoc Uc Puente Alto").openPopup();
  //   //**********Marker**********/
  //   //renderización del 100% del mapa en el contenedor (div)
  //   map.whenReady(() => {
  //     setTimeout(() => {
  //       map.invalidateSize();
  //     }, 100);
  //   });
  // }
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
    this.mapService.showMap();
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
  //**********alerts**********/
  //***mensajes toast */
  messageModify = 'Se han modificado tus datos.';
  messageCancelTravel = 'Has cancelado el viaje.'
  messageRate = 'Tarifa modificada.'
  messageRegister = 'Registrado correctamente'
  messageReport = 'Reporte enviado.'

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
  async modifyData() {
   
    const alert = await this.alertController.create({
      header: 'DuocUc',
      cssClass: 'alertDriver',
      inputs: [
        { 
          type: 'text',
          placeholder: 'Patente',
          attributes: {
            maxlength: 6,
          },
        },
        { 
          type: 'text',
          placeholder: 'Dirección',
          attributes: {
            minlength: 10,
            maxlength: 30,
          },
        },
        { 
          type: 'number',
          placeholder: 'Capacidad',
        }
      ],
      buttons: [
        {
          text: 'Modificar',
          cssClass: 'alert-button-confirm',
          handler: (x => setTimeout(() => {
            this.Toast(this.messageToast(this.messageModify), 'checkmark')
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
  //***modificación tarifa */
  modifyRate(){
    this.Toast(this.messageRate, 'cash');
  }
  //***cancel */
  async cancelTravel() {
   
    const alert = await this.alertController.create({
      header: 'DuocUc',
      message: '<span>¿Seguro que deseas cancelar el viaje?</span>',
      cssClass: 'alertDriver',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
          handler: (x => setTimeout(() => {
                          this.Toast(this.messageToast(this.messageCancelTravel), 'close')
                        }, 500) 
          )
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
      message: '<span>¿Seguro que deseas salir?</span>',
      cssClass: 'alertDriver',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
          handler: ( x => this.route.navigate(['/home']) 
          )
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
      cssClass:'alertDriver',
      inputs: [
        {
          placeholder: 'Patente',
          attributes: {
            maxlength: 6,
          },
        },
        { 
          type: 'text',
          placeholder: 'Dirección',
          attributes: {
            minlength: 10,
            maxlength: 30,
          },
        },
        { 
          type: 'number',
          placeholder: 'Capacidad',
        },
        { 
          type: 'number',
          placeholder: 'Tarifa',
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
  //***report */
  async alertReport() {
    const alert = await this.alertController.create({
      header: 'DuocUc',
      cssClass: 'alertDriver',
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
              this.Toast(this.messageToast(this.messageReport), 'clipboard')
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
  //***cancel */
  async finishAlert() {
   
    const alert = await this.alertController.create({
      header: 'DuocUc',
      message: '<span>Asegurate de recibir los pagos correspondientes. Hasta pronto!!</span>',
      cssClass: 'alertDriver',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
          handler: (x => setTimeout(() => {
                          this.route.navigate(['/home'])
                        }, 700) 
          )
        },
      ],
    });
    await alert.present();
  }
  //**********alerts**********/
  ngOnInit() { }

}
