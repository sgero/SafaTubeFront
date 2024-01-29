import { Component } from '@angular/core';
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: 'app-buscador-video',
  standalone: true,
    imports: [
        HeaderComponent
    ],
  templateUrl: './buscador-video.component.html',
  styleUrl: './buscador-video.component.css'
})
export class BuscadorVideoComponent {

}
