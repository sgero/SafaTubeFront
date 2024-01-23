import { Routes } from '@angular/router';
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {FooterComponent} from "./footer/footer.component";
import {HOME} from "@angular/cdk/keycodes";
import {HomeComponent} from "./home/home.component";
import {PlayvideoComponent} from "./playvideo/playvideo.component";

export const routes: Routes = [
  {path:'safaTube', component:LandingpageComponent},
  {path:'', redirectTo:'/safaTube', pathMatch:"full"},
  {path:'safaTube/registro', component:RegisterComponent},
  {path:'safaTube/login', component:LoginComponent},
  {path:'safaTube/home', component:HomeComponent},
  {path:'safaTube/video', component:PlayvideoComponent},

];
