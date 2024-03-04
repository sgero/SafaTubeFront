import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Generalservice} from "../../service/generalservice";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-verificar-cuenta',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './verificar-cuenta.component.html',
  styleUrl: './verificar-cuenta.component.css'
})
export class VerificarCuentaComponent {

  verificarForm: FormGroup;

  constructor(private fb: FormBuilder, private generalService: Generalservice, private router:Router) {
    this.verificarForm = this.fb.group({
      username: [''],

      email: [''],

      token: [''],

    });
  }

  //metodo para verificar el usuario al comprobar que coincie el token de validación
  verificarUser() {
    if (this.verificarForm.valid) {
      // console.log('hola')
      const userData = this.verificarForm.value;
      this.generalService.verifyUser(userData).subscribe(
        (response) => {
          console.log('Usuario verificado con éxito', response);
          // Puedes redirigir al usuario o realizar otras acciones después del registro.
          Swal.fire('Usuario Verificado con éxito', '', 'success');
          this.router.navigate(['/safaTube/login']);
        },
        (error) => {
          console.error('Error al verificar usuario', error);
          Swal.fire('¡Error al verificar usuario!', '', 'error');
        },
        () => {  // Este es el lugar correcto para el código que se ejecutará después de la operación.
          this.router.navigate(['/safaTube/login']);
        }
      );
    }
  }
}
