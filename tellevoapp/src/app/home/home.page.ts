import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}
  //creación de método para contar los caractéres del input email.
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractéres restantes`;
  }
 
}
