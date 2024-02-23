import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  //
  // componenteVisible: boolean = false;
  //
  // mostrarSidenav() {
  //   this.componenteVisible = !this.componenteVisible;
  //   console.log(this.componenteVisible);
  // }
  //
  // isSidenavOpen: boolean = false;
  //
  // toggleSidenav() {
  //   this.isSidenavOpen = !this.isSidenavOpen;
  // }

  isSidenavOpen: boolean = false;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    console.log(this.isSidenavOpen)
  }


  openModel() {
    const modelDiv = document.getElementById('sidenav');
    if(modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModel() {
    const modelDiv = document.getElementById('sidenav');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    }
  }

  darkMode: boolean = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
}
