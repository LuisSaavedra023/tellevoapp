import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DialogloginPage } from './dialoglogin.page';

const routes: Routes = [
  {
    path: '',
    component: DialogloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DialogloginPageRoutingModule {}
