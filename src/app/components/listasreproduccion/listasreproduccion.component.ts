import {ChangeDetectorRef, Component} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {PlayvideoComponent} from "../playvideo/playvideo.component";
import {ListaReproduccion} from "../../models/ListaReproduccion";
import {ActivatedRoute} from "@angular/router";
import {Generalservice} from "../../service/generalservice";
import {LoginComponent} from "../login/login.component";
import {Video} from "../../models/Video";
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-listasreproduccion',
  standalone: true,
  imports: [
    HeaderComponent,
    PlayvideoComponent,
    NgForOf
  ],
  templateUrl: './listasreproduccion.component.html',
  styleUrl: './listasreproduccion.component.css'
})
export class ListasreproduccionComponent {
  listasReproduccion: any;
  canal: any;
  constructor(private route:ActivatedRoute, private dataservice: Generalservice,private _changeDetectorRef: ChangeDetectorRef,
              private login:LoginComponent) {
  }

  ngOnInit(): void{
    this.verListasReproduccion()
  }

  verListasReproduccion(){
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.dataservice.getCanalUsuarioLogeado(usuario.id)
            .subscribe(data => {
                this.canal = data
                if (this.canal.id) {
                  this.dataservice.enviarIdCanalRecibirListas(this.canal.id)
                    .subscribe(
                      data => {
                        this.listasReproduccion = data;
                        console.log(data);
                        // this.listasReproduccion = this.comentarios.videos;
                      },
                      error => {
                        console.error("no funciona", error);
                      }
                    )
                }
              }
            )
        })
  }



}
