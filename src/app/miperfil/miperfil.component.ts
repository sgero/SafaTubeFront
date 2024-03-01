// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-miperfil',
//   standalone: true,
//   imports: [],
//   templateUrl: './miperfil.component.html',
//   styleUrl: './miperfil.component.css'
// })
// export class MiperfilComponent {
//
// }
//
//

import { Component, OnInit } from '@angular/core';
import {Generalservice} from "../service/generalservice";
import Swal from "sweetalert2";
import {RouterLink} from "@angular/router";
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordModalComponent} from "../change-password-modal/change-password-modal.component";
import {MatButton} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
  username: string | null = '';
  password: string | null = '';
  webhook: string | null = '';
  newPassword: string  = '';


  constructor(private generalService: Generalservice, private router:Router, public dialog: MatDialog) { }



  ngOnInit(): void {
    // Obtener el nombre de usuario del localStorage
    this.username = localStorage.getItem('username');

    // if (this.username === null) {
    //   console.error('No se ha encontrado el nombre de usuario en el localStorage');
    //   // Manejar el error de ser necesario
    // }

    if (this.username)
    // Llamar al servicio para obtener el webhook del usuario
    this.generalService.getUserWebhook(this.username).subscribe(
      (data: any) => {
        this.webhook = data.webhook; // Asigna el webhook obtenido del backend
      },
      error => {
        console.error('Error al obtener el webhook del usuario', error);
        // Manejar el error de ser necesario
      }
    );

  }

  // editarPw() {
  //   //abre un modal para editar la contraseña
  //   this.generalService.editarPw(this.username, this.password).subscribe(
  //     data => {
  //       Swal.fire('¡Contraseña editada con éxito!', '', 'info');
  //     },
  //     error => {
  //       console.error('Error al editar la contraseña', error);
  //       Swal.fire('¡Error al editar la contraseña!', '', 'error');
  //     },
  //     () => {  // Este es el lugar correcto para el código que se ejecutará después de la operación.
  //       this.router.navigate(['/safaTube/login']);
  //     }
  //   );
  // }

  // modalPwOpen() {
  //
  // }

  openChangePasswordModal(): void {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      width: '400px', // Ancho del modal
      // Otras opciones de configuración del modal, si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal ha sido cerrado');
      // Aquí puedes manejar cualquier lógica después de que el usuario cierra el modal
    });
  }



  openModal() {
    const modelDiv2 = document.getElementById('cambiarPw');
    if(modelDiv2 != null) {
      modelDiv2.style.display = 'block';
    }
  }

  closeModal() {
    const modelDiv2 = document.getElementById('cambiarPw');
    if(modelDiv2!= null) {
      modelDiv2.style.display = 'none';
    }
  }

  onSaveClick(): void {
    // Verifica que la nueva contraseña no esté vacía
    // if (this.newPassword.trim() !== '')
    if (this.newPassword)
    {
      // Actualiza la contraseña en el backend a través del servicio GeneralService
      this.generalService.updatePassword(this.newPassword).subscribe(
        response => {
          console.log('Contraseña actualizada exitosamente');
          // Cierra el modal
          this.closeModal();
        },
        error => {
          console.error('Error al actualizar la contraseña:', error);
          // Puedes manejar el error de alguna forma, por ejemplo, mostrando un mensaje al usuario
        }
      );
    } else {
      // Muestra un mensaje al usuario indicando que la contraseña no puede estar vacía
      alert('La contraseña no puede estar vacía');
    }
  }


}
