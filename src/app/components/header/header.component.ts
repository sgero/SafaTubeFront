import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CampanaComponent} from "../campana/campana.component";
import {Generalservice} from "../../service/generalservice";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Video} from "../../models/Video";
import {Busqueda} from "../../models/Busqueda";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {SidenavComponent} from "../../sidenav/sidenav.component";

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
export class HeaderComponent {

  palabraClave: any;

  constructor(private service: Generalservice, private router: Router, private route: ActivatedRoute, private http: HttpClient,) {
  }

  ngOnInit(): void {
    // Llama a buscarVideo() cuando el componente se inicia
  }

  mandarCosulta():void{
    this.service.sendVariable(this.palabraClave)
  }




}

