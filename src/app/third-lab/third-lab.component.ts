import { Component } from '@angular/core';
import { ChartType, Column } from 'angular-google-charts';
import { ThirdLabCalculatorService } from '../services/third-lab-calculator.service';

@Component({
  selector: 'app-third-lab',
  templateUrl: './third-lab.component.html',
  styleUrls: ['./third-lab.component.scss']
})
export class ThirdLabComponent {
  chartType: ChartType = ChartType.ComboChart;
  columns: Column[] = [
    {type: 'number', label: "X1"},
    {type: 'number', label: "Chart"},
    {type: 'number', label: "Фібоначчі"},
    {type: 'number', label: "Золотий перетин"},
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

  start: number=2
  end: number=2;
  e: number = 0.2;
  x1: number=0;
  x2: number =0;
  y: number=0;

  iterationsCount: number=0;
  alpha: number=0.05;

  constructor (protected service: ThirdLabCalculatorService){

  }

  MinimizeFunction(){
    let result = this.service.calculateUsingDiffAlpha(this.start, this.end, this.alpha, 500, this.e);
    this.iterationsCount = this.service.stepsCount;
    this.x1 = result[0];

    this.x2 = result[1];
    this.y = this.service.calculateFunctionValue(this.x1, this.x2);
  }

  MinimizeFunctionMethod2(){
    let result = this.service.calculateUsingStableStep(this.start, this.end, this.alpha, 50, this.e);
    this.iterationsCount = this.service.stepsCount;
    this.x1 = result[0];

    this.x2 = result[1];
    this.y = this.service.calculateFunctionValue(this.x1, this.x2);
  }

  MinimizeFunctionmaxSpeed(){
    let result = this.service.calculateUsingMaxSpeedmethod(this.start, this.end, this.alpha, 50, this.e);
    this.iterationsCount = this.service.stepsCount;
    this.x1 = result[0];

    this.x2 = result[1];
    this.y = this.service.calculateFunctionValue(this.x1, this.x2);
  }

  MinimizeFunctionNewton(){
    let result = this.service.calculateUsingNewtonMethod(this.start, this.end, this.alpha, 50, this.e);
    this.iterationsCount = this.service.stepsCount;
    this.x1 = result[0];

    this.x2 = result[1];
    this.y = this.service.calculateFunctionValue(this.x1, this.x2);
  }

  functionValue(){
    let result = this.service.calculateFunctionValue(this.start, this.end);
    this.y=result;
    console.log(this.y);
  }
}
