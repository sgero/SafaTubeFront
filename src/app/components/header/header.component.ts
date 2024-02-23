import {Component, EventEmitter, HostListener, OnInit, Output, ElementRef} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CampanaComponent} from "../campana/campana.component";
import {Generalservice} from "../../service/generalservice";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Video} from "../../models/Video";
import {Busqueda} from "../../models/Busqueda";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import Swal from "sweetalert2";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// Otras importaciones de componentes de Material que estés utilizando


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
    MatProgressBarModule,
    NgIf,
    NgClass,
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
  showProgressBar = false;
  isSidenavOpen: boolean = false;
  private eRef: any;


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



  // toggleSidenav() {
  //   this.isSidenavOpen = !this.isSidenavOpen;
  //   console.log(this.isSidenavOpen)
  // }


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
                      Swal.fire('¡video creado correctamente!', '', 'success');

                      console.log(data);
                    },
                    error => {
                      console.error("no funciona", error);
                    })

              }
            )
        }
      )
    setTimeout(() => {
        // Lógica después de completar la operación, como redirigir o mostrar un mensaje.
      this.closeModal()
      }, 1000);
    // this.showProgressBar = true;
    // setTimeout(() => {
    //
    //   // Lógica después de completar la operación, como redirigir o mostrar un mensaje.
    //   this.showProgressBar = false;
    // }, 5000);
  }


//metodo para recoger la imagen de base de datos


  protected readonly Generalservice = Generalservice;




  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  // @HostListener('document:click', ['$event'])
  // clickout(event: { target: any; }) {
  //   if (!this.eRef.nativeElement.contains(event.target)) {
  //     this.dropdownOpen = false;
  //   }
  // }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.router.navigate(['/safaTube']);

}

  }

