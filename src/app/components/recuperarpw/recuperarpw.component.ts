import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Generalservice} from "../../service/generalservice";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-recuperarpw',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './recuperarpw.component.html',
  styleUrl: './recuperarpw.component.css'
})
export class RecuperarpwComponent {

  recuperarPwdForm: FormGroup;

  constructor(private fb: FormBuilder, private generalService: Generalservice, private router:Router) {
    this.recuperarPwdForm = this.fb.group({
      // username: [''],

      email: [''],

    });
  }


  recuperarPwd() {
    if (this.recuperarPwdForm.valid) {
      const userData = this.recuperarPwdForm.value;
      this.generalService.recuperarPwd(userData).subscribe(
        (response) => {
          console.log('Nueva password enviada con éxito', response);
          // Puedes redirigir al usuario o realizar otras acciones después del registro.
          Swal.fire('Nueva password generada con éxito, revise su email.', '', 'success');
          this.router.navigate(['/safaTube/login']);
        },
        (error) => {
          console.error('Error al generar una nueva password', error);
          Swal.fire('¡Error al recuperar la password!', '', 'error');
        },
        () => {  // Este es el lugar correcto para el código que se ejecutará después de la operación.
          this.router.navigate(['/safaTube/login']);
        }
      );
    }
  }
}
