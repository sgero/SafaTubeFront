import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {GALLERY_CONFIG, GalleryComponent, GalleryConfig, GalleryItem, ImageItem} from 'ng-gallery';
import {AppComponent} from "../../app.component";
import {bootstrapApplication} from "@angular/platform-browser";
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

  @Input() slides: any[] = [];
  @Input() indicatorsVisible = true;
  @Input() animationSpeed = 600;
  @Input() autoPlay = true;
  @Input() autoPlaySpeed = 4000;
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

  constructor() {
    this.slides = [
      {
        url: 'assets/images/users.jpg',
        title: 'First slide',
        description: 'This is the first slide',
      },
      {
        url: 'assets/images/fotocarrusle.jpg',
        title: 'Second slide',
        description: 'This is the second slide',
      },
      {
        url: 'assets/images/phot.webp',
        title: 'Third slide',
        description: 'This is the third slide',
      },
      {
        url: 'assets/images/1.png',
        title: 'Fourth slide',
        description: 'This is the fourth slide',
      },
      {
        url: 'assets/images/fotocarrusel1.png',
        title: 'Fifth slide',
        description: 'This is the fifth slide',
      },
    ];

  }
  ngOnInit() {
    if (this.autoPlay) {
      setInterval(() => {
        this.next();
      }, this.autoPlaySpeed);
    }
  }

}
