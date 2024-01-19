import { Routes } from '@angular/router';
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {LandingpruebaComponent} from "./landingprueba/landingprueba.component";
import {Prueba2Component} from "./prueba2/prueba2.component";

export const routes: Routes = [
  {path:'safaTube', component:LandingpageComponent},
  {path:'', redirectTo:'/safaTube', pathMatch:"full"},
  {path:'prueba', component:LandingpruebaComponent},
  {path:'otra', component:Prueba2Component},

];
