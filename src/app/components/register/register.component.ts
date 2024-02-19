import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Generalservice} from "../../service/generalservice";
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private generalService: Generalservice, private router:Router) {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      webhook: [''],
      canal: this.fb.group({
        nombre: [''],
        apellidos: [''],
        descripcion: [''],
        fecha_nacimiento: [''],
        telefono: [''],
        foto: [''],
        tipo_contenido: this.fb.group({
          id: [+''],
        }),
        banner: [''],
      }),
    });
  }


  enviarRegistro() {

    if (this.registerForm.valid) {
      // console.log('hola')
      const userData = this.registerForm.value;
      this.generalService.registerUser(userData).subscribe(
        (response) => {
          console.log('Usuario registrado con éxito', response);
          // Puedes redirigir al usuario o realizar otras acciones después del registro.
        },
        (error) => {
          console.error('Error al registrar usuario', error);
        },
        () => {  // Este es el lugar correcto para el código que se ejecutará después de la operación.
          this.router.navigate(['/safaTube/verificar_cuenta/:token']);
        }
      );
    }
  }

}
