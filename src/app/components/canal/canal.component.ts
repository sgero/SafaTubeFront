import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Generalservice} from "../../service/generalservice";
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";

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
  // styleUrls: '.canal.component.css',
  styleUrl: './canal.component.css'
})
export class CanalComponent implements  OnInit{
  videos: any;
  canal:any;
  usuarioLog:any;
  recientes:any;
  populares:any;
  soloSubs:any;
  numeroVideosSubidos:any;
  numeroSuscriptores:any;
  numeroVisitas:any;
  tiposContenidoCanal:any;
  suscriptoresCanal:any;



  accessToPrivateVideos?: boolean ; // Variable para almacenar la opción seleccionada





  constructor(private route:ActivatedRoute, private dataservice: Generalservice, private router: Router){
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
                this.mostrarSuscriptoresCanal();

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
    // Verifica que el modal se esté activando correctamente
    const button = document.querySelector('#openModalButton');
    if (!button) {
      console.error('No se encontró el botón para abrir el modal');
    }

    // Verifica la estructura HTML del modal
    const modal = document.querySelector('#modalConf');
    if (!modal) {
      console.error('No se encontró el modal');
    } else {
      const modalContent = modal.querySelector('.modal-content');
      if (!modalContent) {
        console.error('No se encontró el contenido del modal');
      }
    }
  }



  savePrivacySettings() {
    // Lógica para enviar la opción seleccionada al backend (Symfony)
    this.dataservice.sendConfPrivacy(this.accessToPrivateVideos).subscribe(() => {
      // Aquí puedes ejecutar cualquier lógica adicional después de enviar la configuración al backend
      // Por ejemplo, mostrar un mensaje de éxito al usuario
      Swal.fire('Cambios guardados con éxito', '', 'success');

      setTimeout(() => {
        this.CloseModalConf();
      }, 1000);
      // Aquí puedes redirigir al usuario a una página de éxito o realizar cualquier otra acción
      // this.router.navigate(['/home']);
    });

    // Aquí se haría una solicitud HTTP POST al backend
    console.log('Acceso a videos privados permitido:', this.accessToPrivateVideos);
  }




  openModalConf() {
    const modelDiv = document.getElementById('modalConf');
    if(modelDiv != null) {
      modelDiv.style.display = 'block';
      modelDiv.style.zIndex = String(4);

    }
  }

  CloseModalConf() {
    const modelDiv = document.getElementById('modalConf');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    }

  }

  openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }
  openModelSuscriptores() {
    const modelDiv = document.getElementById('modalSuscriptores');
    const modelDiv2 = document.getElementById('profilemenu');
    if(modelDiv != null) {
      modelDiv.style.display = 'block';
      if(modelDiv2 != null) {
        modelDiv2.style.zIndex = '0';
      }
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
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    }
  }
  CloseModel1() {
    const modelDiv2 = document.getElementById('editarCanal');
    if(modelDiv2!= null) {
      modelDiv2.style.display = 'none';
    }
  }
  Closesuscriptores() {
    const modelDiv = document.getElementById('modalSuscriptores');
    const modelDiv2 = document.getElementById('profilemenu');
    if(modelDiv != null) {
      modelDiv.style.display = 'none';
      if(modelDiv2 != null) {
        modelDiv2.style.zIndex = '1';
      }
    }
  }

  verRecientes(){
    this.dataservice.getVideosSegunCanal(this.canal)
      .subscribe(
        data => {
          this.videos = data;
          this.recientes = true;
          this.populares = false;
          this.soloSubs = false;
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
          this.populares = true;
          this.soloSubs = false;
        },
        error => {
          console.error("no funciona", error);
        }
      )
  }

  verSuscriptores(){
    this.dataservice.getVideosSoloSubs(this.canal)
      .subscribe(
        data => {
          this.videos = data;
          this.recientes = false;
          this.populares = false;
          this.soloSubs = true;
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

  mostrarSuscriptoresCanal(){
    this.dataservice.subsCanal(this.canal)
      .subscribe(data=> {
          this.suscriptoresCanal=data;
        },
        error => {
          console.error("no funciona", error);
        })
  }
}
