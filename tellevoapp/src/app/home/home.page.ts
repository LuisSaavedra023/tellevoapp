import { Component } from '@angular/core';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogloginPage } from '../dialog/dialoglogin/dialoglogin.page';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public dialog: MatDialog, public route: Router) {}
  //creación de método para contar los caractéres del input email.
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractéres restantes`;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogo = this.dialog.open(DialogloginPage, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    // redirección al perfil correspondiente
    dialogo.afterClosed().subscribe(resp => {
      
      if (resp === 1){

        this.route.navigate(['/pasajero'])

      }else{

        if (resp === 2){

          this.route.navigate(['/conductor'])

        }
      }
    })
  }
 
}
