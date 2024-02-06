// import { Component } from '@angular/core';
// import {RouterLink} from "@angular/router";
//
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     RouterLink
//   ],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {
//
//
// }


// _________________________________



// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {FormsModule} from "@angular/forms";
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   standalone: true,
//   imports: [
//     FormsModule
//   ],
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor(private http: HttpClient) {}
//
//   login() {
//     const credentials = {
//       username: 'tu_usuario',
//       password: 'tu_contraseña'
//     };
//
//     this.http.post('https://127.0.0.1:8000/api/login_check', credentials)
//       .subscribe(response => {
//         console.log('Inicio de sesión exitoso', response);
//         // Maneja la respuesta del backend, por ejemplo, guarda el token de sesión.
//       }, error => {
//         console.error('Error en el inicio de sesión', error);
//         // Maneja los errores, por ejemplo, muestra un mensaje al usuario.
//       });
//   }
// }
//
//
// const headers = new HttpHeaders({
//   'Content-Type': 'application/json',
// });
//
// this.http.post('https://127.0.0.1:8000/api/login_check', data, { headers: headers })
//   .subscribe(response => {
//     console.log('Inicio de sesión exitoso', response);
//     // Manejar la respuesta del backend
//   }, error => {
//     console.error('Error en el inicio de sesión', error);
//     // Manejar los errores
//   });

//
// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
//
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   standalone: true,
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor(private http: HttpClient) {}
//
//   login() {
//     const credentials = {
//       username: '',
//       password: ''
//     };
//
//     this.http.post('https://127.0.0.1:8000/api/login_check', credentials)
//       .subscribe(response => {
//         console.log('Inicio de sesión exitoso', response);
//         // Maneja la respuesta del backend, por ejemplo, guarda el token de sesión.
//       }, error => {
//         console.error('Error en el inicio de sesión', error);
//         // Maneja los errores, por ejemplo, muestra un mensaje al usuario.
//       });
//   }
// }


import {AfterViewInit, Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Generalservice} from "../../service/generalservice";
import {Login} from "../../models/Login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{
  // Logear: any = FormGroup;
  // generalservice: any = Generalservice;
  Logear: any = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  // constructor(private http: HttpClient, generalservice: Generalservice, private formBuilder: FormBuilder) {

    //   // this.Logear = generalservice.loginUser();
    //   this.Logear = this.formBuilder.group({
    //     // username: ['', Validators.required],
    //     // password: ['', Validators.required]
    //
    //     username: new FormControl(),
    //     password: new FormControl()
    //   });
    // }
  // }




  // async login() {
  //   const credentials = new Login(this.Logear.value.username, this.Logear.value.password);
  //
  //   console.log(credentials);
  //
  //   const response = await this.generalservice.loginUser(credentials);
  //
  //   //metodo para traer el token de usuario
  //
  //   if (response.token != null) {
  //
  //     this.generalservice.setToken(response.token);
  //     console.log('Inicio de sesión exitoso', response);
  //     // Maneja la respuesta del backend, por ejemplo, guarda el token de sesión.
  //   }
  //
  //
// }

  // constructor(private http: HttpClient, private generalservice: Generalservice, private formBuilder: FormBuilder) { }
  //
  // async login() {
  //   const credentials = new Login(this.logear.value.username, this.logear.value.password);
  //   console.log(credentials);
  //
  //   const response = await this.generalservice.loginUser(credentials);
  //
  //   if (response.token != null) {
  //     this.generalservice.setToken(response.token);
  //     console.log('Inicio de sesión exitoso', response);
  //   }
  // }


//   ngAfterViewInit(): void {
//   }
// }


  //   this.http.post('https://127.0.0.1:8000/api/login_check', credentials)
  //     .subscribe(response => {
  //       console.log('Inicio de sesión exitoso', response);
  //       // Maneja la respuesta del backend, por ejemplo, guarda el token de sesión.
  //     }, error => {
  //       console.error('Error en el inicio de sesión', error);
  //       // Maneja los errores, por ejemplo, muestra un mensaje al usuario.
  //     });
  // }
// }



  constructor(private generalservice: Generalservice, private formBuilder: FormBuilder) {}


  async login() {
    const credentials = new Login(this.Logear.value.username, this.Logear.value.password);

    try {
      const response = await this.generalservice.loginUser(credentials);

      // Verifica si 'response' es un objeto con una propiedad 'token'
      if (response && response.token) {
        // this.generalservice.setToken(response.token);
        console.log('Inicio de sesión exitoso', response);
        // Maneja la respuesta del backend, por ejemplo, redirige a la página principal.
      } else {
        console.error('Error en el inicio de sesión', 'Token no válido');
        // Maneja el escenario donde el token no es válido o no existe.
      }
    } catch (error) {
      console.error('Error en el inicio de sesión', error);
      // Maneja otros errores, por ejemplo, muestra un mensaje al usuario.
    }
  }


  ngAfterViewInit(): void {}

}
