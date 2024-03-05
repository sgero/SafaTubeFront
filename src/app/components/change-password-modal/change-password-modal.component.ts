// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-change-password-modal',
//   standalone: true,
//   imports: [],
//   templateUrl: './change-password-modal.component.html',
//   styleUrl: './change-password-modal.component.css'
// })
// export class ChangePasswordModalComponent {
//
// }


import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Generalservice} from "../../service/generalservice";

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  standalone: true,
  imports: [
    MatButton,
    MatInput,
    MatDialogActions
  ],
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent {

  newPassword: string = '';
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private generalService: Generalservice
  ) {}

  // Método para cerrar el modal
  onCloseClick(): void {
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // Verifica que la nueva contraseña no esté vacía
    if (this.newPassword.trim() !== '') {
      // Actualiza la contraseña en el backend a través del servicio GeneralService
      this.generalService.updatePassword(this.newPassword).subscribe(
        response => {
          console.log('Contraseña actualizada exitosamente');
          // Cierra el modal
          this.dialogRef.close();
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



  onCancelClick() {

  }

  onYesClick() {

  }
}
