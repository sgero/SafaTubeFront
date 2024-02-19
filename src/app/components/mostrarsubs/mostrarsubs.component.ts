import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "../header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {Generalservice} from "../../service/generalservice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mostrarsubs',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './mostrarsubs.component.html',
  styleUrl: './mostrarsubs.component.css'
})
export class MostrarsubsComponent implements OnInit{
  usuario = {username:''};
  canales: any;

  constructor(private service:Generalservice, private router: Router) {

  }
  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.usuario.username = username;
    }
    this.service.cargarSubs(this.usuario).subscribe(data =>{
      this.canales = data;
      console.log(data);
    });
  }

}
