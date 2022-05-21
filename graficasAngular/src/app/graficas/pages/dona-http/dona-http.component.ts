import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { GraficasService } from '../../service/graficas.service';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [
  ]
})
export class DonaHttpComponent implements OnInit {

  constructor( private graficasService: GraficasService ){}

  ngOnInit(){
    this.graficasService.getDoughnutData().subscribe( ({labels, values}) => {
        this.doughnutChartLabels = labels;
        this.doughnutChartData.push(values);
    })
  }

  public doughnutChartLabels: Label[] = [
    // 'Download Sales', 'In-Store Sales', 'Mail-Order Sales'
  ];
  public doughnutChartData: MultiDataSet = [
    // [350, 450, 100],
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  
  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [ 
    {
    backgroundColor: ['#AB60FD', '#7356E3', '#6C75FA', '#5685E3', '#60BDFD']      
    }
  ]

}
