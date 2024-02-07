import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Generalservice} from "../../service/generalservice";
import {NgForOf, NgIf} from "@angular/common";
import {YouTubePlayer} from "@angular/youtube-player";
import {Comentario} from "../../models/Comentario";
import {Usuario} from "../../models/Usuario";
import {FormsModule} from "@angular/forms";
import {HttpEvent} from "@angular/common/http";
import Swal from 'sweetalert2';
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../login/login.component";
import {Valoracion} from "../../models/Valoracion";
import {Video} from "../../models/Video";

@Component({
  selector: 'app-playvideo',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    NgForOf,
    YouTubePlayer,
    RouterLink,
    FormsModule
  ],
  templateUrl: './playvideo.component.html',
  styleUrl: './playvideo.component.css'
})
export class PlayvideoComponent implements OnInit,AfterViewInit, OnDestroy {
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;
  respuestaCreada: any;
  constructor(private route:ActivatedRoute, private dataservice: Generalservice,private _changeDetectorRef: ChangeDetectorRef,
              private login:LoginComponent) {
    this.demoYouTubePlayer = this.video;
  }
  video:any;
  comentarios: any;
  respuestas:any;
  recomendaciones:any;
  crearComentario:Comentario = new Comentario();
  texto:any;
  estaSuscrito:any;
  usuario = new Usuario();
  username:any;
  totalVisitasVideo:any;
  valoracion:Valoracion = new Valoracion();
  valoracionCreada:any;
  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    this.videoWidth = Math.min(this.demoYouTubePlayer.nativeElement.clientWidth, 1200);
    this.videoHeight = this.videoWidth * 0.6;
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }
  ngOnInit() {
    this.route.params.subscribe(params =>
      {const videoId= +params['id'];
        if (videoId) {
          this.dataservice.enviarIdVideoPlayingBaseDatos(videoId)
            .subscribe(
              data => {
                this.video = data;
                this.dataservice.getVideosRecomendadosAPartirDeVideo(this.video)
                  .subscribe(
                    data => {
                      this.recomendaciones = data;
                      this.recomendaciones = this.recomendaciones.videos;
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
        }
      }
    )

    this.route.params.subscribe(params =>
      {const videoId= +params['id'];
        if (videoId) {
          this.dataservice.enviarIdVideoRecibirComentarios(videoId)
            .subscribe(
              data => {
                this.comentarios = data;
                this.comentarios = this.comentarios.videos;
              },
              error => {
                console.error("no funciona", error);
              }
            )
        }
      }
    )
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.dataservice.estaSuscrito(usuario, this.video.canal)
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



    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.dataservice.sumarVisualizacionVideo(usuario, this.video)
            .subscribe(
              data => {
                this.totalVisitasVideo = data;
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






  }

  verRespuestas(comentario:object){
    this.dataservice.enviarComentarioPadreRecibirRespuestasLista(comentario)
      .subscribe(
        data =>{
          this.respuestas = data;
          this.respuestas = this.respuestas.videos;
        },error => {
          console.error("no funciona", error);
        }
      )
  }

  comentar(video:object) {
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
    .subscribe(
      usuario => {
        this.crearComentario.usuario = usuario;
        this.crearComentario.video = video;
        this.crearComentario.texto = this.texto;
        this.crearComentario.comentarioPadre = new Comentario();
        this.crearComentario.usuarioMencionado = new Usuario();
        this.dataservice.crearComentario(this.crearComentario)
          .subscribe(
            data =>{
              this.respuestaCreada = data;
              location.reload();
            },error => {
              console.error("no funciona", error);
            }
          )
      },
      error => {
        console.error("No se pudo obtener el usuario logeado", error);
      })


  }

  responderComentario(video:object, comentario_padre: object, usuario_mencionado:object) {
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.crearComentario.video = video;
          this.crearComentario.texto = this.textoRespuesta;
          this.crearComentario.comentarioPadre = comentario_padre;
          this.crearComentario.usuario = usuario;
          this.crearComentario.usuarioMencionado = usuario_mencionado;
          this.dataservice.crearComentario(this.crearComentario)
            .subscribe(
              data =>{
                this.respuestaCreada = data;
                location.reload();
              },error => {
                console.error("no funciona", error);
              }
            )
        },
        error => {
          console.error("No se pudo obtener el usuario logeado", error);
          }
        )
  }

  mostrarContenido: boolean = false;
  idcomentario:any;
  textoRespuesta:any;
  toggleResponder(c:object) {
    this.mostrarContenido = !this.mostrarContenido;
    this.idcomentario = c;
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
              this.dataservice.eliminarSuscripcion(usuario,this.video.canal)
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
            this.dataservice.suscribirse(usuario,this.video.canal)
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

  darLikeVideo(){
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.valoracion.video = this.video;
          this.valoracion.usuario = usuario;
          this.valoracion.comentario = new Comentario();
          this.valoracion.esLike = true;
          this.dataservice.crearLike(this.valoracion)
            .subscribe(
              data =>{
                this.valoracionCreada = data;
                location.reload();
              },error => {
                console.error("no funciona", error);
              }
            )
        },
        error => {
          console.error("No se pudo obtener el usuario logeado", error);
        }
      )
  }

  darDislikeVideo(){

  }

  darLikeComentario(comentario:Comentario){
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.valoracion.video = new Video();
          this.valoracion.usuario = usuario;
          this.valoracion.comentario = comentario;
          this.valoracion.esLike = true;
          this.dataservice.crearLike(this.valoracion)
            .subscribe(
              data =>{
                this.valoracionCreada = data;
                location.reload();
              },error => {
                console.error("no funciona", error);
              }
            )
        },
        error => {
          console.error("No se pudo obtener el usuario logeado", error);
        }
      )
  }

  darDislikeComentario(){

  }



}
