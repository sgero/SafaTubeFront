import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {Router} from "@angular/router";
import {Generalservice} from "../../service/generalservice";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  mensaje = {texto: '', usuario_emisor:1,usuario_receptor:2};
  emisor ={usuario_emisor: 1, usuario_receptor: 2}
  mensajes: any;
  comparador?: number;
  usuarios: any;
  constructor(private service:Generalservice, private router: Router) {

  }
  ngOnInit() {
    this.service.buscarMensaje(this.emisor).subscribe(data =>{
      this.usuarios = data;
    });
  };

  listarMensaje(){
    this.service.listarMensaje(this.emisor).subscribe(data =>{
      this.comparador = this.emisor.usuario_receptor;
      this.mensajes = data;

    });
  }
  crearMensaje(){
    this.service.
    crearMensaje(this.mensaje).subscribe(data => {
      console.log(data);
    });
  };

}
