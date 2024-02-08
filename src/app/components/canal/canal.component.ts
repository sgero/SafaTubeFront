import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {NgForOf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Generalservice} from "../../service/generalservice";

@Component({
  selector: 'app-canal',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './canal.component.html',
  styleUrl: './canal.component.css'
})
export class CanalComponent implements  OnInit{
  videos: any;
  constructor(private route:ActivatedRoute, private dataservice: Generalservice) {
  }
  ngOnInit() {
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.dataservice.getVideosRecomendados(usuario.id)
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
}
