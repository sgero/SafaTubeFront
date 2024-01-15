import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CarouselModule} from "ngx-bootstrap/carousel";

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [
    RouterLink,
    CarouselModule
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit{
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      src: './assets/img/angular.jpg',
    };
    this.slides[1] = {
      src: './assets/img/react.jpg',
    }
    this.slides[2] = {
      src: './assets/img/vue.jpg',
    }
  }

}
