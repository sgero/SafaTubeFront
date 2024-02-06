import {Component, OnInit} from '@angular/core';
import {Generalservice} from "../../service/generalservice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mensajealerta',
  standalone: true,
  imports: [],
  templateUrl: './mensajealerta.component.html',
  styleUrl: './mensajealerta.component.css'
})
export class MensajealertaComponent implements OnInit{
  usuario ={id:1};
  number: any;
  constructor(private service:Generalservice, private router: Router) {

  }
  ngOnInit(){
    this.service.countMensaje(this.usuario).subscribe(data =>{
      this.number = data;
      console.log(data)
    });
  }
}
