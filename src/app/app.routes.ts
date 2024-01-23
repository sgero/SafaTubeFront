import { Routes } from '@angular/router';
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {CrearVideoComponent} from "./video/crear-video/crear-video.component";

export const routes: Routes = [
  {path:'safaTube', component:LandingpageComponent},
  {path:'', redirectTo:'/safaTube', pathMatch:"full"},
  {path:'safaTube/registro', component:RegisterComponent},
  {path:'safaTube/login', component:LoginComponent},
  {path:'safaTube/subir_video', component:CrearVideoComponent},

];
