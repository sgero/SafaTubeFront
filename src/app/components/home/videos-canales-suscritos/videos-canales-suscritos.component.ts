import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Generalservice} from "../../../service/generalservice";
import {Video} from "../../../models/Video";
import {repeat} from "rxjs";
import {Canal} from "../../../models/Canal";

@Component({
  selector: 'app-videos-canales-suscritos',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './videos-canales-suscritos.component.html',
  styleUrl: './videos-canales-suscritos.component.css'
})
export class VideosCanalesSuscritosComponent implements OnInit{
  videos: any ;
  canal: any;
  constructor(private route:ActivatedRoute, private dataservice: Generalservice) {}

  ngOnInit() {
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.dataservice.getVideosDeCanalesSuscritosPage(usuario.id)
            .subscribe(
              data => {
                this.videos = data;
                this.videos = this.videos.videos;              },
              error => {
                console.error("no funciona", error);
              }
            )
        },
        error => {
          console.error("No se pudo obtener el usuario logeado", error);
        }
      )


  }

  protected readonly repeat = repeat;
}
