import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [ 
    {
    backgroundColor: ['#AB60FD', '#7356E3', '#6C75FA', '#5685E3', '#60BDFD']      
    },
    {
    backgroundColor: ['#AB60FD', '#7356E3', '#6C75FA', '#5685E3', '#60BDFD']      
    },
    {
    backgroundColor: ['#AB60FD', '#7356E3', '#6C75FA', '#5685E3', '#60BDFD']      
    }
  ]

}
