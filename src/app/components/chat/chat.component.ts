import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {Router} from "@angular/router";
import {Generalservice} from "../../service/generalservice";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  // mensaje = {texto: '',usuarioEmisor: 1,usuarioReceptor:2}
  constructor(private service:Generalservice, private router: Router) {

  }
  // crearMensaje(){
  //   this.service.crearMensaje(this.mensaje).subscribe()
  // }
}
