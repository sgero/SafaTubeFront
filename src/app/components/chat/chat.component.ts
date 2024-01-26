import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {Router} from "@angular/router";
import {Generalservice} from "../../service/generalservice";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  mensaje = {texto: '', usuario_emisor:1,usuario_receptor:2}
  constructor(private service:Generalservice, private router: Router) {

  }
  crearMensaje(){
    this.service.
    crearMensaje(this.mensaje).subscribe(data => {
      console.log(data);
    })
  }
}
