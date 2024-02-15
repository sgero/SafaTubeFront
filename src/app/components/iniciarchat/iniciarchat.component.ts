import {Component, OnInit} from '@angular/core';
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
  mensaje = {texto: '', username:'',usuario_receptor:+''};
  constructor(private service:Generalservice, private router: Router) {

  }

  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.mensaje.username = username;
    }
  }
  crearMensaje(){
    this.service.crearMensaje(this.mensaje).subscribe(data =>{
      console.log(data)
    })
    this.router.navigate(['/safatube/chat']);
  }
}
