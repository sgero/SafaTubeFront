import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Generalservice } from "../service/generalservice";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import {Usuario} from "../models/Usuario";

@Component({
  selector: 'app-verificar-cuenta',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './verificarcuentaemail.component.html',
  styleUrl: './verificarcuentaemail.component.css'
})
export class VerificarcuentaemailComponent {


  token: string = '';
  usuario: any; // Asegúrate de especificar el tipo correcto si es posible

  constructor(private generalService: Generalservice, private router: Router, private route: ActivatedRoute) {
    // Capturar el token de la URL cuando el componente se inicializa
    this.route.params.subscribe(params => {
      this.token = params['token'];
      // Llamar al método para verificar el usuario con el token capturado
      this.verificarUsuarioEmail();
    });
  }

  verificarUsuarioEmail() {
    this.generalService.verifyEmailUser(this.token, this.usuario).subscribe({
      next: () => {
        console.log("Usuario verificado con éxito");
        // Aquí puedes redirigir al usuario a una página de éxito o realizar cualquier otra acción
        Swal.fire({
          icon: 'success',
          title: '¡Usuario verificado con éxito!',
          text: 'Redirigiendo al inicio de sesión...',
          showConfirmButton: false,
          timer: 2000 // 2 segundos
        }).then(() => {
          this.router.navigate(['/safaTube/login']); // Redirigir al usuario al inicio de sesión
        });
      },
      error: (error) => {
        console.error("Error al verificar usuario", error);
        // Aquí puedes mostrar un mensaje de error al usuario o realizar cualquier otra acción
        Swal.fire({
          icon: 'error',
          title: 'Error al verificar usuario',
          text: 'Por favor, inténtalo de nuevo más tarde.',
          showConfirmButton: false,
          timer: 2000 // 2 segundos
        }).then(() => {
          this.router.navigate(['/safaTube/login']); // Redirigir al usuario al inicio de sesión
        });

      }

    });
  }
}


