import {Component, OnInit} from '@angular/core';
import {Generalservice} from "../../service/generalservice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-likealerta',
  standalone: true,
  imports: [],
  templateUrl: './likealerta.component.html',
  styleUrl: './likealerta.component.css'
})
export class LikealertaComponent implements OnInit{
  usuario ={id:1};
  number: any;
  number2: any;
  constructor(private service:Generalservice, private router: Router) {

  }
  ngOnInit(){
    this.service.countlike(this.usuario).subscribe(data =>{
      this.number = data;

    });
    this.service.countDislike(this.usuario).subscribe(data =>{
      this.number2 = data;

    });
  }
}
