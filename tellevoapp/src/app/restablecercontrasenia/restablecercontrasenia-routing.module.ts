import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestablecercontraseniaPage } from './restablecercontrasenia.page';

const routes: Routes = [
  {
    path: '',
    component: RestablecercontraseniaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestablecercontraseniaPageRoutingModule {}
