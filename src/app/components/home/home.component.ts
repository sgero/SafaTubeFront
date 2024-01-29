import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {HttpClient} from "@angular/common/http";
import {Generalservice} from "../../service/generalservice";
import {NgForOf} from "@angular/common";
import {TipoCategoria} from "../../models/TipoCategoria";

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
  enviado:any;
  // categoria: TipoCategoria= new TipoCategoria();

  constructor(private http: HttpClient, private route:ActivatedRoute, private dataservice: Generalservice, private router:Router) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      {const usuarioId= +params['id'];
        if (usuarioId) {
          this.dataservice.getVideosParaTiPage(usuarioId)
            .subscribe(
              data => {
                this.videos = data;
              },
              error => {
                console.error("no funciona", error);
              }
            )
        }
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
            data => {
              this.enviado = data;
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
