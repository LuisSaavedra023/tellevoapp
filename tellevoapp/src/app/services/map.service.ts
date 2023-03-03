import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  map: any;

  constructor(private toastController: ToastController, private alertController: AlertController) { }

  showMap(){
    //cargado de mapa con las coordenadas de inicio.
    this.map = new L.Map('map').setView([-33.59901, -70.5784], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    //renderización del 100% del mapa en el contenedor (div)
    this.map.whenReady(() => {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 100);
    });
    //**********Marker**********/
    L.marker([-33.59901, -70.5784]).addTo(this.map).bindPopup("Duoc Uc Puente Alto").openPopup();
    //**********Marker**********/
    
  }
  messageNotFoundAddress = '<span>Dirección inválida.</span>'
  messageOutRange = '<span>Dirección fuera de rango.</span>'
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
  //getting coordinates passenger.
  async api(){
    //getting the address the passenger.
    const address = JSON.stringify(localStorage.getItem('address'));

    const api = 'https://nominatim.openstreetmap.org/search?street=' + address + '&format=json';
    
    const data =  await fetch(api).then(
      response => 
      response.json()
      )
    .catch(error => console.log(error))
    //when the address is found.
    if (data.length > 0){
      //point 
      const latlng1 = L.latLng(-33.59901, -70.5784);
      //destiny
      const latlng2 = L.latLng(data[0].lat, data[0].lon);

      const distance = latlng1.distanceTo(latlng2) /1000
      //when the address is in the range.
      if (distance <= 5){
        //add to dinamic marker passenger.
        L.marker([data[0].lat, data[0].lon]).addTo(this.map).bindPopup("Destino").openPopup();

        var polyline = L.polyline([latlng1, latlng2], {color: 'rgb(0, 22, 75)', weight: 2,}).addTo(this.map);

        const alert = await this.alertController.create({
              header: 'DuocUc',
              message: '<span>Dirección ingresada con éxito.</span>',
              buttons: [{
                text: 'Ok',
                cssClass: 'alert-button-confirm',
                  
              }],
              cssClass: 'alertCustomCss',
            });
            
            await alert.present();

      }else{

        this.Toast(this.messageOutRange, 'earth');

      }
    //when te address is not found.
    }else{

      this.Toast(this.messageNotFoundAddress, 'earth');

    }
  
  }
}
