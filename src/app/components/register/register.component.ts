import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Generalservice} from "../../service/generalservice";
import {RouterLink} from "@angular/router";




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

  constructor(private fb: FormBuilder, private generalService: Generalservice) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      canal: this.fb.group({
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
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

// usuario= {
//   username: '',
//   password: '',
//   email: '',
//   canal: {
//     nombre: '',
//     apellidos: '',
//     descripcion: '',
//     fecha_nacimiento:'' ,
//     telefono: '',
//     foto: '',
//     tipo_contenido: {
//       id: 1,
//     },
//     banner: ''
//   }
// };
// }

  // canal = {
  //   nombre: '',
  //   apellidos: '',
  //   descripcion: '',
  //   fecha_nacimiento: '',
  //   telefono: '',
  //   foto: '',
  //   tipo_contenido: {
  //     id: 1
  //   },
  //   banner: ''
  // };
  // }

  enviarRegistro() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.generalService.registerUser(userData).subscribe(
        (response) => {
          console.log('Usuario registrado con éxito', response);
          // Puedes redirigir al usuario o realizar otras acciones después del registro.
        },
        (error) => {
          console.error('Error al registrar usuario', error);
        }
      );
    }
  }
}
