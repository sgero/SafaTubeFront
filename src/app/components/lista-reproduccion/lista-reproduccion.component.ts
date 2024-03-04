import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ListaReproduccion} from "../../models/ListaReproduccion";
import {HeaderComponent} from "../header/header.component";
import {NgForOf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Generalservice} from "../../service/generalservice";
import {YouTubePlayer} from "@angular/youtube-player";
// import $ from "jquery";
// import 'perfect-scrollbar';
// import 'slick-carousel';

@Component({
  selector: 'app-lista-reproduccion',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    RouterLink,
    YouTubePlayer
  ],
  templateUrl: './lista-reproduccion.component.html',
  styleUrl: './lista-reproduccion.component.css'
})
export class ListaReproduccionComponent implements OnInit{
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer!: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;
  listaReproduccion: ListaReproduccion = new ListaReproduccion();
  videos: any;
  videoVisualizar:any;

  constructor(private http: HttpClient, private route:ActivatedRoute, private dataservice: Generalservice, private router:Router
  ,private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.videosLista();
  }
  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    this.videoWidth = Math.min(this.demoYouTubePlayer.nativeElement.clientWidth, 1200);
    this.videoHeight = this.videoWidth * 0.6;
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  videosLista(){
    this.route.params.subscribe(params =>
    {const listaId= +params['id'];
      if (listaId) {
    this.dataservice.getVideosLista(listaId)
      .subscribe(
        data => {
          this.videos = data.video;
          // console.log(data);
          // this.videos = this.videos.video;
          this.videoVisualizar = this.videos[0];
          },
        error => {
          console.error("no funciona", error);
        }
      )}})
  }

}
