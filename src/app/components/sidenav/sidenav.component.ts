import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {


  componenteVisible: boolean = false;

  mostrarSidenav() {
    this.componenteVisible = !this.componenteVisible;
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
