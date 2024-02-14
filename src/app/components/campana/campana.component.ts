import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LikealertaComponent} from "../likealerta/likealerta.component";
import {SuscripcionalertaComponent} from "../suscripcionalerta/suscripcionalerta.component";
import {MensajealertaComponent} from "../mensajealerta/mensajealerta.component";
import {Generalservice} from "../../service/generalservice";

@Component({
  selector: 'app-campana',
  standalone: true,
  imports: [RouterLink, LikealertaComponent, SuscripcionalertaComponent, MensajealertaComponent],
  templateUrl: './campana.component.html',
  styleUrl: './campana.component.css'
})
export class CampanaComponent implements OnInit,AfterViewInit{
  @ViewChild('activo') campanaActivo: ElementRef | undefined;
  @ViewChild('inactivo') campanaInactivo: ElementRef | undefined;
  @ViewChild('notifi') desplegable: ElementRef | undefined;
  usuario = {username:''};
  isfalse=false;
  constructor(private service: Generalservice) {}
  ngAfterViewInit() {

    if (this.isfalse) {
      // Puedes acceder a los elementos aquí
      console.log('Elementos inicializados:');
      if (this.campanaActivo && this.campanaInactivo && this.desplegable) {
        this.campanaActivo.nativeElement.style.display = 'block';
        this.campanaInactivo.nativeElement.style.display = 'none';
        this.desplegable.nativeElement.style.display = 'none';
      }
    }
  }

  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.usuario.username = username;
    }
    this.service.campana(this.usuario).subscribe(data =>{
      this.isfalse = data;
      console.log(data)
      if (this.isfalse) {
        // Puedes acceder a los elementos aquí
        console.log('Elementos inicializados:');
        if (this.campanaActivo && this.campanaInactivo && this.desplegable) {
          this.campanaActivo.nativeElement.style.display = 'block';
          this.campanaInactivo.nativeElement.style.display = 'none';
          this.desplegable.nativeElement.style.display = 'none';
        }
      }
    });
    // if (this.campanaActivo && this.campanaInactivo) {
    //   this.campanaActivo.nativeElement.style.display = 'block';
    //   this.campanaInactivo.nativeElement.style.display = 'none';
    // }
  }

  mostrar(){
    console.log("funciona?");
    if (this.campanaActivo && this.campanaInactivo && this.desplegable) {
      this.campanaActivo.nativeElement.style.display = 'none';
      this.campanaInactivo.nativeElement.style.display = 'block';
      if (this.desplegable.nativeElement.style.display == 'none'){
        this.desplegable.nativeElement.style.display = 'flex';
      }else{
        this.desplegable.nativeElement.style.display = 'none';
      }
    }
    this.service.atender(this.usuario).subscribe(data =>{
      console.log(data);
    });

  }
}
