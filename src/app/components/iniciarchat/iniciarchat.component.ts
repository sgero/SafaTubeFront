import {Component, Input, OnInit} from '@angular/core';
import {Generalservice} from "../../service/generalservice";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-iniciarchat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './iniciarchat.component.html',
  styleUrl: './iniciarchat.component.css'
})
export class IniciarchatComponent implements OnInit{
  @Input() parametro?: string;
  mensaje = {texto: '', username:'',usernamesecundario: ''};
  constructor(private service:Generalservice, private router: Router) {

  }

  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.mensaje.username = username;
    }
  }
  crearMensaje(){
    if (this.parametro) {
      this.mensaje.usernamesecundario = this.parametro;
    }
    this.service.crearloMensaje(this.mensaje).subscribe(data =>{
      console.log(data)
    })
    this.router.navigate(['safaTube/chat']);
  }
}
