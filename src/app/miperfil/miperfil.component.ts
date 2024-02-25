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



@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatButton
  ],
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
  username: string | null = '';
  password: string | null = '';
  webhook: string | null = '';

  constructor(private generalService: Generalservice, private router:Router, public dialog: MatDialog) { }



  ngOnInit(): void {
    // Obtener el nombre de usuario del localStorage
    this.username = localStorage.getItem('username');

    // Llamar al servicio para obtener el webhook del usuario
    this.generalService.getUserWebhook().subscribe(
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
}
