import { Routes } from '@angular/router';
import {LandingpageComponent} from "./landingpage/landingpage.component";

export const routes: Routes = [
  {path:'safaTube', component:LandingpageComponent},
  {path:'', redirectTo:'/safaTube', pathMatch:"full"},

];
