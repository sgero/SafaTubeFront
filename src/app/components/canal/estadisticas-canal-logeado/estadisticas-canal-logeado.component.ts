import {Component, OnInit, ViewChild} from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";
import {HeaderComponent} from "../../header/header.component";
import {Generalservice} from "../../../service/generalservice";
import {KnobModule} from "primeng/knob";
import {FormsModule} from "@angular/forms";
import {ChartModule} from "primeng/chart";
import {BadgeModule} from "primeng/badge";
import {RouterLink} from "@angular/router";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-estadisticas-canal-logeado',
  standalone: true,
  imports: [
    NgApexchartsModule,
    HeaderComponent,
    KnobModule,
    FormsModule,
    ChartModule,
    BadgeModule,
    RouterLink
  ],
  templateUrl: './estadisticas-canal-logeado.component.html',
  styleUrl: './estadisticas-canal-logeado.component.css'
})

export class EstadisticasCanalLogeadoComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  canal: any;
  suscriptores: any;
  numeroSubs: number[] = [];
  index:any;
  x: any;
  numeroLikesVideos:any;
  numeroDislikesVideos:any;
  porcentajeLikes:any;
  sumaLikesDislikes:any;
  videoMejorValorado:any;
  categoriasMasVisitadasNumero: any;
  categoriasMasVisitadasNombre: any;
  datosGrafica:number[] = [];
  opcionesGrafica:[]= [];
  constructor(private dataservice: Generalservice) {
  }
  i:any;
  z:any;
  y:any;
  ngOnInit() {
    var dateActual = new Date()
    var primerDia = new Date();
    primerDia.setDate(dateActual.getDate() + 1);
    var ultimoDia = new Date();
    ultimoDia.setDate(ultimoDia.getDate() - 30);
    var fechasElegidas: string | any[] ;
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.dataservice.getCanalUsuarioLogeado(usuario.id)
            .subscribe(
              data => {
                this.canal = data;
                this.cargarPorcentajeValoracionesVideo();
                this.dataservice.verSuscriptoresEntreDosFechas(data.id, primerDia, ultimoDia)
                  .subscribe(
                    data => {
                      this.suscriptores = data;
                      fechasElegidas = obtenerFechasIntermedias(ultimoDia, dateActual);
                      for (this.i = 1; this.i <= fechasElegidas.length; this.i++){
                        this.numeroSubs.push(this.i);
                      }
                      for (this.x in this.numeroSubs){
                        this.numeroSubs[this.x] = 0;
                      }
                      for (this.y in data){
                        const fechaString = data[this.y].fecha;
                        for (let f in fechasElegidas){
                          if (fechaString.split(" ")[0] == fechasElegidas[f]){
                            this.numeroSubs[f] += 1;
                          }
                        }
                      }
                      this.chartOptions = {
                        series: [
                          {
                            name: "Suscriptores",
                            data: this.numeroSubs
                          }
                        ],
                        chart: {
                          height: 425,
                          type: "line",
                          zoom: {
                            enabled: false
                          }
                        },
                        dataLabels: {
                          enabled: false
                        },
                        stroke: {
                          curve: "smooth"
                        },
                        title: {
                          text: "Suscriptores en los últimos 31 días -> Total: "+ this.suscriptores.length,
                          align: "center"
                        },
                        grid: {
                          row: {
                            colors: ["#f3f3f3", "transparent"],
                            opacity: 0.5
                          }
                        },
                        xaxis: {
                          categories: fechasElegidas
                        }
                      };
                        },
                    error => {
                      console.error("no funciona", error);
                    }
                  )
              },
              error => {
                console.error("no funciona", error);
              }
            )
        },
        error => {
          console.error("No se pudo obtener el usuario logeado", error);
        }
      )

  }

  cargarPorcentajeValoracionesVideo(){
    this.dataservice.cargarPorcentajeValoracionesVideo(this.canal).subscribe({
      next: (d) => {
        this.numeroLikesVideos = d.likes.count;
        this.numeroDislikesVideos = d.dislikes.count;
        this.videoMejorValorado = d.video;
        this.graficaCategoriasMasVisitadas(d.categoriasVisitadas);
        // this.categoriasMasVisitadas = d.categoriasVisitadas.count;
        this.sumaLikesDislikes = this.numeroLikesVideos + this.numeroDislikesVideos;
        this.porcentajeLikes = calcularPorcentaje(this.numeroLikesVideos, this.sumaLikesDislikes);
      }, error: (e) => {
        console.error(e);
      },
      complete: () => {
        console.info("Éxito")      }
    });
  }

  graficaCategoriasMasVisitadas(datos:any){
    for (let x in datos){
      this.categoriasMasVisitadasNumero.push(datos[x]["count"])
      this.categoriasMasVisitadasNombre.push(datos[x]["nombre"])
    }

    // this.datosGrafica = {
    //   labels: this.categoriasMasVisitadasNombre,
    //   datasets: [
    //     {
    //       data: this.categoriasMasVisitadasNumero,
    //    }
    //   ]
    // };
    //
    // this.opcionesGrafica = {
    //   cutout: '60%',
    // };

  }

}

function obtenerFechasIntermedias(fechaInicio: Date, fechaFin: Date): string[] {
  const fechasIntermedias: Date[] = [];
  const fechasAMandar: string[] = [];
  let fechaActual = new Date(fechaInicio);
  while (fechaActual <= fechaFin) {
    fechasIntermedias.push(new Date(fechaActual));
    fechaActual.setDate(fechaActual.getDate() + 1);
  }
  for (let i in fechasIntermedias){
    fechasAMandar.push(fechasIntermedias[i].toISOString().slice(0, 10));
  }

  return fechasAMandar;
}

function calcularPorcentaje(valorParcial: number, valorTotal: number): number {
  if (valorTotal == 0) {
    return 0;
  }

  return (valorParcial / valorTotal) * 100;
}
