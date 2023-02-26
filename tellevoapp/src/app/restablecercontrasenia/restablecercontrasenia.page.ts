import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecercontrasenia',
  templateUrl: './restablecercontrasenia.page.html',
  styleUrls: ['./restablecercontrasenia.page.scss'],
})
export class RestablecercontraseniaPage implements OnInit {

  constructor(private alertController: AlertController, public route: Router) { }
  //creación de método para contar los caractéres del input email.
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractéres restantes`;
  }
  //**********alerts**********/
  async presentAlert(message : string) {
    const alert = await this.alertController.create({
      header: 'DuocUc',
      message: message,
      cssClass: 'alertCustomCss',
      buttons: [{
        text: 'Ok',
        cssClass: 'alert-button-confirm',
        handler: () => {
          this.route.navigate(['/home'])
        }
      }],
      
    });

    await alert.present();
  }
  //**********alerts**********/
  ngOnInit() {
  }

}
