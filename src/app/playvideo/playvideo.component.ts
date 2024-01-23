import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-playvideo',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './playvideo.component.html',
  styleUrl: './playvideo.component.css'
})
export class PlayvideoComponent {

}
