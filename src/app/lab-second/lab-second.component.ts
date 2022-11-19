import { Component, OnInit } from '@angular/core';
import { ChartType, Column } from 'angular-google-charts';
import { CalculationsService } from '../services/calculations.service';

@Component({
  selector: 'lab-second',
  templateUrl: './lab-second.component.html',
  styleUrls: ['./lab-second.component.scss']
})
export class LabSecondComponent implements OnInit {

  constructor(protected service: CalculationsService) { }

  ngOnInit(): void {
  }

  chartType: ChartType = ChartType.ComboChart;
  columns: Column[] = [
    {type: 'number', label: "X1"},
    {type: 'number', label: "Chart"},
    {type: 'number', label: "Min Point Fibonacci"},
    {type: 'number', label: "Min Point Golden"},
    // {type: 'number', label: "Group A"},
    // {type: 'number', label: "Group B"},
    // "X1", "Divider", "Group A", "Group B"
  ];
  data: any[] =[];
  chartOptions: any={
    hAxis: {title: 'x1'},
    vAxis: {title: 'x2'},
    seriesType: 'scatter',
    series:{
      0: {type: 'line', pointSize: 0, lineWidth: 2, color: "#32a860"}
    },
    explorer: {
      //actions: ['dragToZoom', 'rightClickToReset'],
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 4.0
    },
  }


  e: number=0;
  start: number=0;
  end: number=0;
  fibonacciResult: [number, number]=[0,0];
  goldenResult: [number, number]=[0,0];
  iterationsFibonacci: number=0;
  iterationsGolden: number=0;
  MinimizeFunction(){
    this.data=[];
    let fibonacciResult = this.service.calculateMinUsingFibonacci(this.start, this.end, this.e);
    this.fibonacciResult = fibonacciResult;
    this.data.push([fibonacciResult[0], null, this.fibonacciResult[1], null]);
    this.iterationsFibonacci = this.service.iterationCount;
    let goldenResult = this.service.calculateMinUsingGolden(this.start, this.end, this.e);
    this.goldenResult = goldenResult;
    this.data.push([goldenResult[0], null, null, this.goldenResult[1]]);
    this.iterationsGolden = this.service.iterationCount;

    for(let i=this.start; i<this.end; i+=0.1 ){
      this.data.push([i, this.service._f(i), null, null]);
    }
  }
}
