import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Generalservice} from "../../service/generalservice";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-canal',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    RouterLink,
    NgIf,
    FormsModule
  ],
  templateUrl: './canal.component.html',
  styleUrl: './canal.component.css'
})
export class CanalComponent implements  OnInit{
  videos: any;
  canal:any;
  usuarioLog:any;
  recientes:any;
  numeroVideosSubidos:any;
  numeroSuscriptores:any;
  numeroVisitas:any;
  tiposContenidoCanal:any;

  constructor(private route:ActivatedRoute, private dataservice: Generalservice) {
  }

  ngOnInit() {
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.usuarioLog = usuario;
          this.dataservice.getCanalUsuarioLogeado(usuario.id)
            .subscribe(
              data => {
                  this.canal = data;
                  console.log(this.canal)

                this.dataservice.getVideosSegunCanal(data)
                    .subscribe(
                      data => {
                            this.videos = data;
                            this.recientes = true;
                          },
                      error => {
                        console.error("no funciona", error);
                      }
                    )
                this.dataservice.getInfoCanal(data)
                  .subscribe(
                    data => {
                      this.numeroVideosSubidos = data.numeroVideos[0]["count"];
                      this.numeroSuscriptores = data.numeroSuscriptores[0]["count"];
                      this.numeroVisitas = data.numeroVisitas[0]["count"]
                    },
                    error => {
                      console.error("no funciona", error);
                    }
                  )
                },
              error => {
                console.error("no funciona", error);
              }
            )
        },
        error => {
          console.error("No se pudo obtener el usuario logeado", error);
        }
      )

    this.dataservice.getTipoContenido()
      .subscribe(
        data => {
          this.tiposContenidoCanal = data;
        },
        error => {
          console.error("no funciona", error);
        }
      )



  }

  openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }
  openModel1() {
    const modelDiv2 = document.getElementById('editarCanal');
    if(modelDiv2 != null) {
      modelDiv2.style.display = 'block';
    }
  }


  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    const modelDiv2 = document.getElementById('editarCanal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    }
    if(modelDiv2!= null) {
      modelDiv2.style.display = 'none';
    }
  }
  CloseModel1() {
    const modelDiv2 = document.getElementById('editarCanal');
    if(modelDiv2!= null) {
      modelDiv2.style.display = 'none';
    }
  }



  verRecientes(){
    this.dataservice.getVideosSegunCanal(this.canal)
      .subscribe(
        data => {
          this.videos = data;
          this.recientes = true;
        },
        error => {
          console.error("no funciona", error);
        }
      )
  }

  verPopulares(){
    this.dataservice.getVideosPopularesSegunCanal(this.canal)
      .subscribe(
        data => {
          this.videos = data;
          this.recientes = false;
        },
        error => {
          console.error("no funciona", error);
        }
      )
  }

  editarCanal(){
    this.dataservice.editarCanal(this.canal)
      .subscribe(data=> {
        this.canal=data;
        this.CloseModel1()
        this.ngOnInit();
        console.log(data);
        },
        error => {
          console.error("no funciona", error);
        })
  }
}
