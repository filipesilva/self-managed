import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthGuard } from './user/auth.guard';


const routes: Routes = [
  {
    path: 'dayplanner',
    loadChildren: './dayplanner/dayplanner.module#DayplannerModule',
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/dayplanner', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
