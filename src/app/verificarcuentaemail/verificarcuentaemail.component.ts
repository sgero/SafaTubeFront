import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-verificarcuentaemail',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './verificarcuentaemail.component.html',
  styleUrl: './verificarcuentaemail.component.css'
})
export class VerificarcuentaemailComponent {

  // usuario: { email: string, nombreUsuario: string } = { email: '', nombreUsuario: '' };
  // token: string = '';
  //
  // validarUsuario() {
  //   // Aquí implementarías la lógica para validar el usuario con los valores ingresados
  //   console.log('Validando usuario...');
  //   console.log('Email:', this.usuario.email);
  //   console.log('Usuario:', this.usuario.nombreUsuario);
  //   console.log('Token:', this.token);
  // }


}
