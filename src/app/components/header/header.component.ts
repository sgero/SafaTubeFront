import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CampanaComponent} from "../campana/campana.component";
import {Generalservice} from "../../service/generalservice";
import {FormsModule} from "@angular/forms";
import {BusquedaVideo} from "../../models/BusquedaVideo";
import {HttpClient} from "@angular/common/http";
import {Video} from "../../models/Video";
import {BuscadorVideoComponent} from "../home/buscador-video/buscador-video.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CampanaComponent,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  palabraClave: any;
  datos: any;
  // videos: Video[] = [];
  @Output() videosEvent = new EventEmitter<Video[]>()

  constructor(private service: Generalservice, private router: Router, private route: ActivatedRoute, private http: HttpClient,) {
  }

  ngOnInit(): void {
    // Llama a buscarVideo() cuando el componente se inicia
  }

  sendVideos(){
    this.videosEvent.emit(this.datos)
  }

  buscarVideo(){
    console.log('Valor recibido:', this.palabraClave);
    this.route.params.subscribe(params =>
    {
      if (this.palabraClave){
        this.service.BuscarVideo(this.palabraClave)
          .subscribe(data=> {
              this.datos= data;
              this.datos = this.datos.videos[0];
              // this.videos = this.datos;
              console.log(data);
            },
            error => {
              console.error("no funciona", error);
            })
      }
    })
    }
  // buscarCanal() {
  //   console.log('Valor recibido:', this.palabraClave);
  //   this.route.params.subscribe(params => {
  //     if (this.palabraClave) {
  //       this.service.BuscarCanal(this.palabraClave)
  //         .subscribe(data => {
  //             this.datos = data;
  //             console.log(data);
  //           },
  //           error => {
  //             console.error("no funciona", error);
  //           })
  //     }
  //   })
  // }
}

