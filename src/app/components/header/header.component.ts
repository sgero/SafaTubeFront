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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CampanaComponent,
    FormsModule,
    SidenavComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  palabraClave: any;
  private usuario = {username: ''};
  imagenPerfil:any;

  constructor(private service: Generalservice, private router: Router, private route: ActivatedRoute, private http: HttpClient,) {
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


//metodo para recoger la imagen de base de datos



}

