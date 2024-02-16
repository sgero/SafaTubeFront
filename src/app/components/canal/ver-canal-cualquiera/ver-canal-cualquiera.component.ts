import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Generalservice} from "../../../service/generalservice";
import Swal from "sweetalert2";
import {IniciarchatComponent} from "../../iniciarchat/iniciarchat.component";

@Component({
  selector: 'app-ver-canal-cualquiera',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    IniciarchatComponent
  ],
  templateUrl: './ver-canal-cualquiera.component.html',
  styleUrl: './ver-canal-cualquiera.component.css'
})
export class VerCanalCualquieraComponent implements OnInit{
  videos: any;
  canal:any;
  usuarioLog:any;
  recientes:any;
  numeroVideosSubidos:any;
  numeroSuscriptores:any;
  numeroVisitas:any;
  tiposContenidoCanal:any;
  nombreUsuario:any;
  estaSuscrito:any;
  respuestas:any;
  divmensjae: any;
  constructor(private route:ActivatedRoute, private dataservice: Generalservice) {
  }

  ngOnInit() {
    this.route.params.subscribe(params =>
    {this.nombreUsuario = params['nombre'];
      {if (this.nombreUsuario) {
        this.dataservice.getCanalSegunUsername(this.nombreUsuario)
          .subscribe(
            data => {
              this.canal = data;
              this.dataservice.getVideosSegunCanal(data)
                .subscribe(
                  data => {
                    this.videos = data;
                    this.recientes = true;
                    console.log(this.videos)
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
              this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
                .subscribe(
                  usuario => {
                    this.dataservice.estaSuscrito(usuario, this.canal)
                      .subscribe(
                        data => {
                          this.estaSuscrito = data;
                          this.estaSuscrito = this.estaSuscrito[0];
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
            },
            error => {
              console.error("no funciona", error);
            }
          )
        }
        }
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

  eliminarSuscripcion(){
    Swal.fire({
      title: '¿Quieres eleminar tu suscripción?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: '¡Eliminar!',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
          .subscribe(
            usuario => {
              this.dataservice.eliminarSuscripcion(usuario,this.canal)
                .subscribe(
                  data =>{
                    this.respuestas = data;
                    location.reload();
                  },error => {
                    Swal.fire('¡error!', '', 'error');
                    console.error("no funciona", error);
                  }
                )
            },
            error => {
              console.error("No se pudo obtener el usuario logeado", error);
            }
          )
      } else if (result.isDenied) {
        Swal.fire('Suscripción no eliminada', '', 'error');
      }
    });
  }

  suscribirse() {
    Swal.fire({
      title: '¿Quieres suscribirte?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: '¡Sí!',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
          .subscribe(
            usuario => {
              this.dataservice.suscribirse(usuario,this.canal)
                .subscribe(
                  data =>{
                    this.respuestas = data;
                    location.reload();
                  },error => {
                    Swal.fire('¡error!', '', 'error');
                    console.error("no funciona", error);
                  }
                )
            },
            error => {
              console.error("No se pudo obtener el usuario logeado", error);
            }
          )
      } else if (result.isDenied) {
        Swal.fire('Suscripción no realizada', '', 'error');
      }
    });
  }

  aparecediv(){
    this.divmensjae  = document.getElementById('iniciarchat');
    this.divmensjae.style.display = 'flex';
  }
  ocultardiv(){
    this.divmensjae = document.getElementById('iniciarchat');
    this.divmensjae.style.display = 'none';
  }

}
