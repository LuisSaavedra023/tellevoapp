import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DialogloginPageRoutingModule } from './dialoglogin-routing.module';

import { DialogloginPage } from './dialoglogin.page';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DialogloginPageRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [DialogloginPage]
})
export class DialogloginPageModule {}
