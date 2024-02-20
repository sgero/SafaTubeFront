import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Generalservice } from "../service/generalservice";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

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
export class VerificarcuentaemailComponent implements OnInit{


  verificarEmailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private generalService: Generalservice,
    private router: Router,
    private route: ActivatedRoute // 1. Importa ActivatedRoute
  ) {
    this.verificarEmailForm = this.fb.group({

      token: [''],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { // 3. Obtén los parámetros de la URL
      if (params['username'] && params['email'] && params['token']) {
        this.verificarEmailForm.patchValue({
          username: params['username'],
          email: params['email'],
          token: params['token']
        });
        // Realiza la verificación automáticamente
        this.verificarEmailUser();
      }
    });
  }

  // Método para verificar el usuario al comprobar que coincide el token de validación
  verificarEmailUser() {
    if (this.verificarEmailForm.valid) {
      const userData = this.verificarEmailForm.value;
      this.generalService.verifyEmailUser(userData).subscribe(
        (response) => {
          console.log('Usuario verificado con éxito', response);
          Swal.fire('Usuario Verificado con éxito', '', 'success');
          this.router.navigate(['/safaTube/login']);
        },
        (error) => {
          console.error('Error al verificar usuario', error);
          Swal.fire('¡Error al verificar usuario!', '', 'error');
        },
        () => {
          this.router.navigate(['/safaTube/login']);
        }
      );
    }
  }
}


