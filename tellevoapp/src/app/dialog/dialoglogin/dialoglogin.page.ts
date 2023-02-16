import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HomePage } from 'src/app/home/home.page';

@Component({
  selector: 'app-dialoglogin',
  templateUrl: './dialoglogin.page.html',
  styleUrls: ['./dialoglogin.page.scss'],
})
export class DialogloginPage implements OnInit {

  constructor(public dialogRef: MatDialogRef<HomePage>) { }

  ngOnInit() {
  }

}
