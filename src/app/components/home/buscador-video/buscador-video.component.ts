import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {NgForOf} from "@angular/common";
import {Video} from "../../../models/Video";
import {Generalservice} from "../../../service/generalservice";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-buscador-video',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf
  ],
  templateUrl: './buscador-video.component.html',
  styleUrl: './buscador-video.component.css'
})
export class BuscadorVideoComponent implements OnInit{
  // palabraClave: any;
  // datos: any;
  videos: Video[] = [];


  constructor() {
  }

  ngOnInit(): void {
    // Puedes inicializar datos aquí si es necesario
  }

  // buscarVideo2(){
  //   console.log('Valor recibido:', this.palabraClave);
  //   this.route.params.subscribe(params =>
  //   {
  //     if (this.palabraClave){
  //       this.service.BuscarVideo(this.palabraClave)
  //         .subscribe(data=> {
  //             this.datos=data;
  //             console.log(data);
  //           },
  //           error => {
  //             console.error("no funciona", error);
  //           })
  //     }
  //   })
  // }
}
