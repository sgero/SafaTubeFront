import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CampanaComponent} from "../campana/campana.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CampanaComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
