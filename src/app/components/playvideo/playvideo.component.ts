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
import {ListaReproduccion} from "../../models/ListaReproduccion";

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
  indice: any;
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
  perteneceACanalLogueado:any;
  usuario :any;
  username:any;
  totalVisitasVideo:any;
  valoracion:Valoracion = new Valoracion();
  valoracionCreada:any;
  comentarioEliminadoCorrectamente:any;
  totalLikesVideo:any;
  totalDisikesVideo:any;
  canal:any;
  x:any;
  datos: any;
  listasReproduccion: any;
  crearListaReproduccion: ListaReproduccion = new ListaReproduccion();
  nombre: any;

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
    this.cargarVideo();
    this.estaSuscritoCanal();
    this.cargarComentarios();
    this.videoPerteneceACanalLogueado();
  }

  cargarVideo(){
    this.route.params.subscribe(params =>
      {const videoId= +params['id'];
        if (videoId) {
          this.dataservice.enviarIdVideoPlayingBaseDatos(videoId)
            .subscribe(
              data => {
                this.video = data;
                this.cargarLikesDislikesVideo();
                this.videoPerteneceACanalLogueado();
                this.estaSuscritoCanal();
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
              },
              error => {
                console.error("no funciona", error);
              }
            )
        }
      }
    )
  }

  videoPerteneceACanalLogueado(){
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.dataservice.getCanalUsuarioLogeado(usuario.id)
            .subscribe(
              data => {
                this.canal = data
                if (this.canal.id == this.video.canal.id){
                  this.perteneceACanalLogueado = true;
                }else {
                  this.perteneceACanalLogueado = false;
                }
              })
        }
      )
  }
  cargarComentarios(){
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
  }
  estaSuscritoCanal(){
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.usuario = usuario;
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
              this.texto = "";
              this.respuestaCreada = data;
              this.cargarComentarios();
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
                this.cargarComentarios();
                this.verRespuestas(comentario_padre);
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
                    this.estaSuscritoCanal();
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
                  this.estaSuscritoCanal();
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

  cargarLikesDislikesVideo(){
    this.dataservice.cargarValoracionesVideo(this.video)
      .subscribe(
        data => {
          this.totalLikesVideo = data.likes;
          this.totalDisikesVideo = data.dislikes;
        }, error =>{
        console.error("No se pudo obtener el usuario logeado", error);
      }
    )
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
                this.cargarLikesDislikesVideo();
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
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.valoracion.video = this.video;
          this.valoracion.usuario = usuario;
          this.valoracion.comentario = new Comentario();
          this.valoracion.esLike = false;
          this.dataservice.crearLike(this.valoracion)
            .subscribe(
              data =>{
                this.valoracionCreada = data;
                this.cargarLikesDislikesVideo();
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
                this.dataservice.cargarValoracionesComentario(comentario)
                  .subscribe(
                    datos=>{
                      for (this.x in this.comentarios){
                        if (comentario.id == this.comentarios[this.x]["id"]){
                          this.comentarios[this.x]["contador_likes"] = datos.likes;
                          this.comentarios[this.x]["contador_dislikes"] = datos.dislikes;
                        }
                      }
                      for (this.x in this.respuestas){
                        if (comentario.id == this.respuestas[this.x]["id"]){
                          this.respuestas[this.x]["contador_likes"] = datos.likes;
                          this.respuestas[this.x]["contador_dislikes"] = datos.dislikes;
                        }
                      }
                    }
                  )
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

  darDislikeComentario(comentario:Comentario){
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.valoracion.video = new Video();
          this.valoracion.usuario = usuario;
          this.valoracion.comentario = comentario;
          this.valoracion.esLike = false;
          this.dataservice.crearLike(this.valoracion)
            .subscribe(
              data =>{
                this.valoracionCreada = data;
                this.dataservice.cargarValoracionesComentario(comentario)
                  .subscribe(
                    datos=>{
                      for (this.x in this.comentarios){
                        if (comentario.id == this.comentarios[this.x]["id"]){
                          this.comentarios[this.x]["contador_likes"] = datos.likes;
                          this.comentarios[this.x]["contador_dislikes"] = datos.dislikes;
                        }
                      }
                      for (this.x in this.respuestas){
                        if (comentario.id == this.respuestas[this.x]["id"]){
                          this.respuestas[this.x]["contador_likes"] = datos.likes;
                          this.respuestas[this.x]["contador_dislikes"] = datos.dislikes;
                        }
                      }
                    }
                  )
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

  eliminarComentario(idComentario:any){
    Swal.fire({
      title: '¿Quieres eliminar el comentario?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: '¡Sí!',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataservice.eliminarComentario(idComentario)
          .subscribe(
            data => {
              this.comentarioEliminadoCorrectamente = data;
              this.cargarComentarios();
            },
            error => {
              console.error("No se pudo borrar", error);
            }
          )
        }
      }
    )
  }

  openModal() {
    const modelDiv2 = document.getElementById('editarVideo');
    if(modelDiv2 != null) {
      modelDiv2.style.display = 'block';
    }
  }

  closeModal() {
    const modelDiv2 = document.getElementById('editarVideo');
    if(modelDiv2!= null) {
      modelDiv2.style.display = 'none';
    }
  }

  editarVideo() {
    this.dataservice.EditarVideo(this.video)
      .subscribe(data => {
          this.datos = data;
          Swal.fire('¡video modificado correctamente!', '', 'success');
          console.log(data);
        },
        error => {
          console.error("no funciona", error);
        })

    setTimeout(() => {
      // Lógica después de completar la operación, como redirigir o mostrar un mensaje.
      this.closeModal()
    }, 1000);
  }

  eliminarVideo() {
    Swal.fire({
      title: '¿Quieres eliminar el video?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: '¡Sí!',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataservice.EliminarVideo(this.video)
          .subscribe(data=> {
                this.datos=data;
                Swal.fire('¡video eliminado correctamente!', '', 'success');
                console.log(data);
              },
              error => {
                console.error("no funciona", error);
              }
              )
      }
    })}

  openModalListas(){
    const modelDiv2 = document.getElementById('listaReproduccion');
    if(modelDiv2 != null) {
      modelDiv2.style.display = 'block';
    }
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
  })}

  closeModalListas() {
    const modelDiv2 = document.getElementById('listaReproduccion');
    if(modelDiv2!= null) {
      modelDiv2.style.display = 'none';
    }
  }

  agregarVideo(){

  }

  openCrearLista(){
    const modelDiv2 = document.getElementById('crearLista');
    if(modelDiv2 != null) {
      modelDiv2.style.display = 'block';
    }
  }
  closeCrearLista(){
    const modelDiv2 = document.getElementById('crearLista');
    if(modelDiv2!= null) {
      modelDiv2.style.display = 'none';
    }
  }

  crearLista(){
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.dataservice.getCanalUsuarioLogeado(usuario.id)
            .subscribe(data => {
                this.canal = data;
                this.crearListaReproduccion.canal = this.canal;
                this.crearListaReproduccion.nombre = this.nombre;
                this.dataservice.CrearListaReproduccion(this.crearListaReproduccion)
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
            )
        })
  }

}
