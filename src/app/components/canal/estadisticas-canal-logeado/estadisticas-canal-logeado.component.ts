import {Component, OnInit, ViewChild} from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid, NgApexchartsModule
} from "ng-apexcharts";
import {HeaderComponent} from "../../header/header.component";
import {Generalservice} from "../../../service/generalservice";

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
    HeaderComponent
  ],
  templateUrl: './estadisticas-canal-logeado.component.html',
  styleUrl: './estadisticas-canal-logeado.component.css'
})

export class EstadisticasCanalLogeadoComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  canal: any;
  suscriptores: any;

  constructor(private dataservice: Generalservice) {
    this.chartOptions = {
      series: [
        {
          name: "Suscriptores",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Suscriptores en el último año",
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };
  }
  i:any;
  ngOnInit() {
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.dataservice.getUsuarioLogeado(localStorage.getItem('username'))
      .subscribe(
        usuario => {
          this.dataservice.getCanalUsuarioLogeado(usuario.id)
            .subscribe(
              data => {
                this.canal = data;
                this.dataservice.verSuscriptoresEntreDosFechas(data.id, primerDia, ultimoDia)
                  .subscribe(
                    data => {
                      this.suscriptores = data;
                      for (this.i = 1; this.i <= 31; this.i++){
                        const fechaString = this.suscriptores.fecha;
                        const fecha = new Date(fechaString);
                        const diaDeLaSemana = fecha.getDay();
                        if (diaDeLaSemana == this.i){
                          this.chartOptions.series?.at(this.i)
                        }
                      }
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
}
