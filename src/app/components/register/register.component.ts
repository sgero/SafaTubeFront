import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from './general.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private generalService: GeneralService) {
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
          id: [1],
        }),
        banner: [''],
      }),
    });
  }


  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.generalService.register(userData).subscribe(
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
