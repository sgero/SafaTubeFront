import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {HttpClient} from "@angular/common/http";
import {Generalservice} from "../../service/generalservice";
import {NgForOf} from "@angular/common";
import {TipoCategoria} from "../../models/TipoCategoria";
import {Video} from "../../models/Video";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements  OnInit{
  videos: any;
  tipocategorias: any;
  enviado:Video[] = [];
  // categoria: TipoCategoria= new TipoCategoria();

  constructor(private http: HttpClient, private route:ActivatedRoute, private dataservice: Generalservice, private router:Router) {}

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


    this.dataservice.getTipoCategorias()
      .subscribe((data: any) => {
        this.tipocategorias = data;
      },
          (error: any) => {
          console.error("no funciona", error);
        }
      )
  }

  getVideos(categoria: object) {
    this.route.params.subscribe(params =>
    {
      this.tipocategorias = categoria;
      if (this.tipocategorias) {
        this.dataservice.getVideosSegunCategoria(this.tipocategorias)
          .subscribe(
            (data:any) => {
              this.enviado.push(data);
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

