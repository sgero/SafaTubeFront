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
  mensaje = {texto: '', username:'',usuario_receptor:+''};
  textob: any;
  emisor ={username:'', usuario_receptor: +''};
  mensajes: any;
  comparador?: number;
  canales: any;
  div2:any;
  creamensajes:any;
  usao = false;
  constructor(private service:Generalservice, private router: Router) {

  }
  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.mensaje.username = username;
      this.emisor.username = username;
    }
    this.div2 = document.getElementById('div2');
    this.service.buscarMensaje(this.emisor).subscribe(data =>{
      this.canales = data;
      console.log(data);
    });
    this.creamensajes = document.getElementById('crear_mensaje');
    this.creamensajes.style.display = 'none';
  };
  ngAfterViewChecked(){
    // Simula la carga de datos después de un cierto tiempo (por ejemplo, 2 segundos)
    // setTimeout(() => {
      // const miDiv: HTMLElement | null = this.elRef.nativeElement.querySelector('#miDiv');
    if (!this.usao) {
      if (this.div2) {
        // Establece la posición del scrollbar al final
        this.div2.scrollTop = this.div2.scrollHeight;
      }
    }
    // }, 500); // Cambia este valor según sea necesario
  }
  listarMensaje(id?: number){
    if (id != null) {
      this.emisor.usuario_receptor = id;
      this.mensaje.usuario_receptor = id;
    }
    if (this.emisor.usuario_receptor > 0){
      this.creamensajes.style.display = 'flex';
    }
    this.service.listarMensaje(this.emisor).subscribe(data =>{
      this.comparador = this.emisor.usuario_receptor;
      this.mensajes = data;
    });
  this.cacharra()
  }
  crearMensaje(){
    this.service.
    crearMensaje(this.mensaje).subscribe(data => {
      console.log(data);
      this.listarMensaje(this.mensaje.usuario_receptor);
    });

    this.textob = document.getElementById('texto');
    this.textob.value = '';
  };
  cacharra(){
    setTimeout(() => {
      this.listarMensaje(this.emisor.usuario_receptor);
    }, 3000);
  }
  // private scrollDivToBottom(): void {
  //   // Ajustar el scrollTop al fondo para ambas divs
  //
  //   if (this.div2) {
  //     this.div2.nativeElement.scrollTop = this.div2.nativeElement.scrollHeight;
  //   }
  // }
  boleanochange(){this.usao = false; setTimeout(()=>{this.usao=true;}, 3000)}
}
