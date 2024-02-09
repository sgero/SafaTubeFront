import {Component, OnInit} from '@angular/core';
import {Generalservice} from "../../service/generalservice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-suscripcionalerta',
  standalone: true,
  imports: [],
  templateUrl: './suscripcionalerta.component.html',
  styleUrl: './suscripcionalerta.component.css'
})
export class SuscripcionalertaComponent implements OnInit{
  usuario ={username: ''};
  number: any;
  constructor(private service:Generalservice, private router: Router) {

  }
  ngOnInit(){
    const username = localStorage.getItem('username');
    if (username) {
      this.usuario.username = username;
    }
    this.service.countSubs(this.usuario).subscribe(data =>{
      this.number = data;
      console.log(data)
    });
  }
}
