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



@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
  username: string | null = '';
  password: string | null = '';

  constructor(private generalService: Generalservice, private router:Router) { }



  ngOnInit(): void {
    // Obtener el nombre de usuario del localStorage
    this.username = localStorage.getItem('username');
  }

  editarPw() {
    //abre un modal para editar la contraseña
    this.generalService.editarPw(this.username, this.password).subscribe(
      data => {
        Swal.fire('¡Contraseña editada con éxito!', '', 'info');
      },
      error => {
        console.error('Error al editar la contraseña', error);
        Swal.fire('¡Error al editar la contraseña!', '', 'error');
      },
      () => {  // Este es el lugar correcto para el código que se ejecutará después de la operación.
        this.router.navigate(['/safaTube/login']);
      }
    );
  }
}
