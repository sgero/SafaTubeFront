import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LikealertaComponent} from "../likealerta/likealerta.component";
import {SuscripcionalertaComponent} from "../suscripcionalerta/suscripcionalerta.component";
import {MensajealertaComponent} from "../mensajealerta/mensajealerta.component";

@Component({
  selector: 'app-campana',
  standalone: true,
  imports: [RouterLink, LikealertaComponent, SuscripcionalertaComponent, MensajealertaComponent],
  templateUrl: './campana.component.html',
  styleUrl: './campana.component.css'
})
export class CampanaComponent implements OnInit{
  @ViewChild('activo') campanaActivo: ElementRef | undefined;
  @ViewChild('inactivo') campanaInactivo: ElementRef | undefined;

  constructor() {}

  ngOnInit() {
    if (this.campanaActivo && this.campanaInactivo) {
      this.campanaActivo.nativeElement.style.display = 'none';
      this.campanaInactivo.nativeElement.style.display = 'block';
    }
  }
}
