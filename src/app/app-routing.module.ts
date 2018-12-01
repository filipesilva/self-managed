import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './login.component';


const routes: Routes = [
  { path: 'dayplanner', loadChildren: './dayplanner/dayplanner.module#DayplannerModule' },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/dayplanner', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
