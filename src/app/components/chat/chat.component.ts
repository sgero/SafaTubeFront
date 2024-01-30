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
  mensaje = {texto: '', usuario_emisor:1,usuario_receptor:+''};
  textob: any;
  emisor ={usuario_emisor: 1, usuario_receptor: +''};
  mensajes: any;
  comparador?: number;
  canales: any;
  div1:any;
  div2:any;
  constructor(private service:Generalservice, private router: Router) {

  }
  ngOnInit() {
    this.div1 = document.getElementById('div1');
    this.div2 = document.getElementById('div2');
    this.service.buscarMensaje(this.emisor).subscribe(data =>{
      this.canales = data;
      console.log(data);
    });

  };

  listarMensaje(id?: number){
    if (id != null) {
      this.emisor.usuario_receptor = id;
      this.mensaje.usuario_receptor = id;
    }
    this.service.listarMensaje(this.emisor).subscribe(data =>{
      this.comparador = this.emisor.usuario_receptor;
      this.mensajes = data;

    });
    // this.scrollDivToBottom();
  }
  crearMensaje(){
    this.service.
    crearMensaje(this.mensaje).subscribe(data => {
      console.log(data);
    });
    this.listarMensaje(this.mensaje.usuario_receptor);
    this.textob = document.getElementById('texto');
    this.textob.value = '';
  };
  // private scrollDivToBottom(): void {
  //   // Ajustar el scrollTop al fondo para ambas divs
  //   if (this.div1) {
  //     this.div1.nativeElement.scrollTop = this.div1.nativeElement.scrollHeight;
  //   }
  //
  //   if (this.div2) {
  //     this.div2.nativeElement.scrollTop = this.div2.nativeElement.scrollHeight;
  //   }
  // }
}
