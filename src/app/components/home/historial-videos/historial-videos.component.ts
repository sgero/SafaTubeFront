import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {NgForOf} from "@angular/common";
import {Video} from "../../../models/Video";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Generalservice} from "../../../service/generalservice";
import { CarouselModule } from 'primeng/carousel';
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-historial-videos',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    RouterLink,
    CarouselModule,
    ButtonModule
  ],
  templateUrl: './historial-videos.component.html',
  styleUrl: './historial-videos.component.css'
})
export class HistorialVideosComponent implements OnInit{
  videos: any;
  responsiveOptions: any[] | undefined;
  constructor(private dataservice: Generalservice) {}

  ngOnInit() {
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.dataservice.getHistorial(usuario)
            .subscribe(
              data => {
                  this.videos = data;
                  this.videos = this.videos.videos;
                },
            )
        }
      )

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];


  }
}
