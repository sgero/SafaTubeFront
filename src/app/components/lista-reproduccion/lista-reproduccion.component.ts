import { Component } from '@angular/core';
import {ListaReproduccion} from "../../models/ListaReproduccion";
import {HeaderComponent} from "../header/header.component";
// import $ from "jquery";
import 'perfect-scrollbar';
import 'slick-carousel';

@Component({
  selector: 'app-lista-reproduccion',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './lista-reproduccion.component.html',
  styleUrl: './lista-reproduccion.component.css'
})
export class ListaReproduccionComponent {

  listaReproduccion: ListaReproduccion = new ListaReproduccion();


  // const playlistWrapTwoCol: JQuery<HTMLElement> = $('.video-playlist-wrap.two-col .scroll-wrap');
  // playlistWrapTwoCol.perfectScrollbar();
  //
  // const playlistWrap: JQuery<HTMLElement> = $('.video-playlist-wrap').not('.two-col').find('.scroll-wrap');
  // playlistWrap.slick({
  //                      slidesToShow: 6,
  //                      responsive: [
  //                        {
  //                          breakpoint: 980,
  //                          settings: {
  //                            slidesToShow: 4,
  //                          }
  //                        },
  //                        {
  //                          breakpoint: 720,
  //                          settings: {
  //                            slidesToShow: 2,
  //                          }
  //                        }
  //                      ]
  //                    });

}
