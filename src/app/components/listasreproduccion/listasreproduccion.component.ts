import {ChangeDetectorRef, Component} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {PlayvideoComponent} from "../playvideo/playvideo.component";
import {ListaReproduccion} from "../../models/ListaReproduccion";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Generalservice} from "../../service/generalservice";
import {LoginComponent} from "../login/login.component";
import {Video} from "../../models/Video";
import {NgForOf} from "@angular/common";
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-listasreproduccion',
  standalone: true,
  imports: [
    HeaderComponent,
    PlayvideoComponent,
    NgForOf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './listasreproduccion.component.html',
  styleUrl: './listasreproduccion.component.css'
})
export class ListasreproduccionComponent {
  listasReproduccion: any;
  canal: any;
  listaReproduccion: any;
  datos: any;
  listaSeleccionada: any;
  constructor(private route:ActivatedRoute, private http: HttpClient, private dataservice: Generalservice,private _changeDetectorRef: ChangeDetectorRef,) {
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
                        this.listaSeleccionada = true;
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

  editarModal(lista: any) {
    this.listaSeleccionada = lista;
    console.log(this.listaSeleccionada)
    const modelDiv2 = document.getElementById('editarLista');
    if(modelDiv2 != null) {
      modelDiv2.style.display = 'block';
    }
  }

  closeEditarModal() {
    const modelDiv2 = document.getElementById('editarLista');
    if(modelDiv2!= null) {
      modelDiv2.style.display = 'none';
    }
  }

  editarLista() {
    this.dataservice.EditarListaReproduccion(this.listaSeleccionada)
      .subscribe(data => {
          this.datos = data;
          Swal.fire('¡lista modificada correctamente!', '', 'success');
          console.log(data);
          this.verListasReproduccion();
        },
        error => {
          console.error("no funciona", error);
        })

    setTimeout(() => {
      // Lógica después de completar la operación, como redirigir o mostrar un mensaje.
      this.closeEditarModal()
    }, 1000);
  }

  eliminarLista(lista: any) {
    Swal.fire({
      title: '¿Quieres eliminar la lista?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: '¡Sí!',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataservice.EliminarListaReproduccion(lista)
          .subscribe(data=> {
              this.datos=data;
              this.verListasReproduccion();
              Swal.fire('¡lista eliminada correctamente!', '', 'success');
              console.log(data);
            },
            error => {
              console.error("no funciona", error);
            }
          )
      }
    })}

}
