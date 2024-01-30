import { Routes } from '@angular/router';
import {CrearVideoComponent} from "./components/video/crear-video/crear-video.component";
import {LandingpageComponent} from "./components/landingpage/landingpage.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HOME} from "@angular/cdk/keycodes";
import {HomeComponent} from "./components/home/home.component";
import {PlayvideoComponent} from "./components/playvideo/playvideo.component";
import {ChatComponent} from "./components/chat/chat.component";
import {
  VideosCanalesSuscritosComponent
} from "./components/home/videos-canales-suscritos/videos-canales-suscritos.component";

export const routes: Routes = [
  {path:'safaTube', component:LandingpageComponent},
  {path:'', redirectTo:'/safaTube', pathMatch:"full"},
  {path:'safaTube/registro', component:RegisterComponent},
  {path:'safaTube/login', component:LoginComponent},
  {path:'safaTube/subir_video', component:CrearVideoComponent},
  {path:'safaTube/home', component:HomeComponent},
  {path:'safaTube/home/suscritos/:id', component:VideosCanalesSuscritosComponent},
  {path:'safaTube/video', component:PlayvideoComponent},
  {path:'safaTube/video/:id', component:PlayvideoComponent},
  {path:'safaTube/chat', component:ChatComponent},

];
