import {AfterViewInit, Component, ViewChild} from '@angular/core';
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
export class BuscadorVideoComponent {

  // @ViewChild(HeaderComponent) child: any;

  constructor() {}

  // videos: Video[]=[];
  datos: any;

  receiveMessage($event: Video[]) {
    this.datos = $event;
  }

  // datos: any;
  // ngAfterViewInit() {
  //   this.datos = this.child.datos
  // }



  ngDoCheck(e: any){
    console.log()
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
