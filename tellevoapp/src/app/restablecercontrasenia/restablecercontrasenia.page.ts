import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restablecercontrasenia',
  templateUrl: './restablecercontrasenia.page.html',
  styleUrls: ['./restablecercontrasenia.page.scss'],
})
export class RestablecercontraseniaPage implements OnInit {

  constructor() { }
  //creación de método para contar los caractéres del input email.
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caractéres restantes`;
  }

  ngOnInit() {
  }

}
