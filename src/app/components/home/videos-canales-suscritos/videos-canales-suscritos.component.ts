import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Generalservice} from "../../../service/generalservice";
import {Video} from "../../../models/Video";
import {repeat} from "rxjs";
import {Canal} from "../../../models/Canal";

@Component({
  selector: 'app-videos-canales-suscritos',
  standalone: true,
    imports: [
        HeaderComponent,
        NgForOf
    ],
  templateUrl: './videos-canales-suscritos.component.html',
  styleUrl: './videos-canales-suscritos.component.css'
})
export class VideosCanalesSuscritosComponent implements OnInit{
  videos: any ;
  canal: any;
  constructor(private route:ActivatedRoute, private dataservice: Generalservice) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      {const usuarioId= +params['id'];
        if (usuarioId) {
          this.dataservice.getVideosDeCanalesSuscritosPage(usuarioId)
        .subscribe(
              data => {
                this.videos = data;
                this.videos = this.videos.videos;
              },
              error => {
                console.error("no funciona", error);
              }
            )
        }
      }
    )


  }

  protected readonly repeat = repeat;
}
