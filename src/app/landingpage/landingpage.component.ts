import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {GALLERY_CONFIG, GalleryComponent, GalleryConfig, GalleryItem, ImageItem} from 'ng-gallery';
import {AppComponent} from "../app.component";
import {bootstrapApplication} from "@angular/platform-browser";
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
    GalleryComponent
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit{
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
  ngOnInit(): void {}

}
