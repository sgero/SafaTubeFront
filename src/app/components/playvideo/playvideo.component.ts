import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Generalservice} from "../../service/generalservice";

@Component({
  selector: 'app-playvideo',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './playvideo.component.html',
  styleUrl: './playvideo.component.css'
})
export class PlayvideoComponent implements OnInit{
  constructor(private http: HttpClient, private route:ActivatedRoute, private dataservice: Generalservice, private router:Router) {}
  video:any;
  ngOnInit() {
    this.route.params.subscribe(params =>
      {const videoId= +params['id'];
        if (videoId) {
          this.dataservice.enviarIdVideoPlayingBaseDatos(videoId)
            .subscribe(
              data => {
                this.video = data;
              },
              error => {
                console.error("no funciona", error);
              }
            )
        }
      }
    )
  }
}
