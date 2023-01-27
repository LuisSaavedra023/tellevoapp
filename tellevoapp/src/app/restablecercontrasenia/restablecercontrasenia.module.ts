import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestablecercontraseniaPageRoutingModule } from './restablecercontrasenia-routing.module';

import { RestablecercontraseniaPage } from './restablecercontrasenia.page';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestablecercontraseniaPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  declarations: [RestablecercontraseniaPage]
})
export class RestablecercontraseniaPageModule {}
