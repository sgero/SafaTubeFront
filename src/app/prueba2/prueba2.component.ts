import {Component, Input, OnInit} from '@angular/core';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {NgClass, NgStyle} from "@angular/common";
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {LandingpageComponent} from "../landingpage/landingpage.component";

@Component({
  selector: 'app-prueba2',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    FaIconComponent,
    FontAwesomeModule,
    CommonModule,
    LandingpageComponent
  ],
  templateUrl: './prueba2.component.html',
  styleUrl: './prueba2.component.css'
})
export class Prueba2Component{
  slides: any[] = [
    {
      url: 'assets/images/1.png',
      title: 'First slide',
      description: 'This is the first slide',
    },
    {
      url: 'assets/images/fotocarrusel1.png',
      title: 'Second slide',
      description: 'This is the second slide',
    },
    {
      url: 'assets/images/fotocarrusle.jpg',
      title: 'Third slide',
      description: 'This is the third slide',
    },
    {
      url: 'assets/images/fotofamilia.jpeg',
      title: 'Fourth slide',
      description: 'This is the fourth slide',
    },
    {
      url: 'assets/images/logo.png',
      title: 'Fifth slide',
      description: 'This is the fifth slide',
    },
  ];
}
