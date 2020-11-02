import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { AuthGaurdService } from './service/auth-gaurd.service';

const routes: Routes = [
  { path: '', component: LoginComponent,canActivate:[AuthGaurdService] },
  { path: 'orderTracking', component: OrderTrackingComponent,canActivate:[AuthGaurdService]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: ''}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
