import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {Video} from "../../../models/Video";
import {Generalservice} from "../../../service/generalservice";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-buscador-video',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    KeyValuePipe
  ],
  templateUrl: './buscador-video.component.html',
  styleUrl: './buscador-video.component.css'
})
export class BuscadorVideoComponent {

  // @ViewChild(HeaderComponent) child: any;

  constructor(private service: Generalservice, private router: Router, private route: ActivatedRoute, private http: HttpClient,) {
  }

  videos: any;

  ngOnInit() {
      this.service.currentVariable.subscribe({
        next: (v) => this.buscarVideo(v)

    });

  }


  buscarVideo(busqueda:any){

    console.log('Valor recibido:', busqueda);
      this.service.BuscarVideo(busqueda)
        .subscribe({
          next: (content) => this.videos = content.videos,
          error: (e) => console.error("no funciona", e),
          complete:() => console.info(this.videos)
        })
  }



  ngDoCheck(e: any){
    console.log()
  }




}
