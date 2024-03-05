import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Generalservice} from "../../service/generalservice";

@Component({
  selector: 'app-confprivacy',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './confprivacy.component.html',
  styleUrl: './confprivacy.component.css'
})
export class ConfprivacyComponent {

  // selectedPreference: string = ''; // Variable para almacenar la preferencia seleccionada
  //
  // constructor() { }
  //
  // savePreferences() {
  //   // Lógica para enviar la preferencia seleccionada al backend (Symfony)
  //   // Aquí se haría una solicitud HTTP POST al backend
  //   console.log('Preferencia seleccionada:', this.selectedPreference);
  // }

  accessToPrivateVideos?: boolean ; // Variable para almacenar la opción seleccionada

  constructor(private generalservice: Generalservice) {

  }

  savePrivacySettings() {
    // Lógica para enviar la opción seleccionada al backend (Symfony)

    this.generalservice.sendConfPrivacy(this.accessToPrivateVideos).subscribe()

    // Aquí se haría una solicitud HTTP POST al backend
    console.log('Acceso a videos privados permitido:', this.accessToPrivateVideos);


  }

}
