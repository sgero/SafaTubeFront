import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CampanaComponent} from "../campana/campana.component";
import {Generalservice} from "../../service/generalservice";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Video} from "../../models/Video";
import {Busqueda} from "../../models/Busqueda";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CampanaComponent,
    FormsModule,
    SidenavComponent,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  palabraClave: any;
  private usuario = {username: ''};
  imagenPerfil:any;

  videoNuevo: Video = new Video();
  datos: any;

  constructor(public service: Generalservice, private router: Router, private route: ActivatedRoute, private http: HttpClient,) {
  }

  ngOnInit() {
    this.service.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.service.getCanalUsuarioLogeado(usuario.id)
            .subscribe(
              canal => {
                this.imagenPerfil = canal.foto;
              }
            )
        }
      )



  }

  mandarCosulta():void{
    this.service.sendVariable(this.palabraClave)
  }

  openModal() {
    const modelDiv2 = document.getElementById('crearVideo');
    if(modelDiv2 != null) {
      modelDiv2.style.display = 'block';
    }
  }

  closeModal() {
    const modelDiv2 = document.getElementById('crearVideo');
    if(modelDiv2!= null) {
      modelDiv2.style.display = 'none';
    }
  }


  crearVideo(){
    this.service.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.service.getCanalUsuarioLogeado(usuario.id)
            .subscribe(
              canal => {
                this.videoNuevo.canal = canal;
                this.service.CrearVideo(this.videoNuevo)
                  .subscribe(data=> {
                      this.datos=data;
                      console.log(data);
                    },
                    error => {
                      console.error("no funciona", error);
                    })

              }
            )
        }
      )
  }


//metodo para recoger la imagen de base de datos


  protected readonly Generalservice = Generalservice;
}

