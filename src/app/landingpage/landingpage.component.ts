import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {GALLERY_CONFIG, GalleryComponent, GalleryConfig, GalleryItem, ImageItem} from 'ng-gallery';
import {AppComponent} from "../app.component";
import {bootstrapApplication} from "@angular/platform-browser";
import {Prueba2Component} from "../prueba2/prueba2.component";
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass, NgStyle} from "@angular/common";
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    }
  ]
})
@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [
    RouterLink,
    CarouselModule,
    GalleryComponent,
    RouterOutlet,
    FaIconComponent,
    NgClass,
    NgStyle
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit{
  backgroundImages: string[] = [
    'assets/images/logo.png',
    'assets/images/fotofamilia.jpeg',
  ];


  @Input() slides: any[] = [];
  @Input() indicatorsVisible = true;
  @Input() animationSpeed = 500;
  @Input() autoPlay = false;
  @Input() autoPlaySpeed = 3000;
  currentSlide = 0;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  hidden = false;

  next() {
    let currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.jumpToSlide(currentSlide);
  }

  previous() {
    let currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.jumpToSlide(currentSlide);
  }

  jumpToSlide(index: number) {
    this.hidden = true;
    setTimeout(() => {
      this.currentSlide = index;
      this.hidden = false;
    },this.animationSpeed);
  }


  images:any[];
  texto:any;

  constructor() {
    this.images = [
      new ImageItem({src:'assets/images/fotocarrusle.jpg', thumb: 'assets/images/fotocarrusle.jpg'}),
      new ImageItem({src:'assets/images/fotocarrusle.jpg', thumb: 'assets/images/fotocarrusle.jpg'}),
      new ImageItem({src:'assets/images/1.png', thumb: 'assets/images/1.png'}),

    ]
    this.texto = 'hola';
  }
  ngOnInit() {
    if (this.autoPlay) {
      setInterval(() => {
        this.next();
      }, this.autoPlaySpeed);
    }
  }

}
