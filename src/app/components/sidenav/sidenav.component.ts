import { Component } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    NgClass
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
}
