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
    {type: 'number', label: "Графік"},
    {type: 'number', label: "Стабільний крок"},
    {type: 'number', label: "Ділення кроку"},
    {type: 'number', label: "Найшвидший спуск"},
    {type: 'number', label: "Ньютон"},
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
  e: number = 0.0001;
  alpha: number=0.05;

  x1Stab: number=0;
  x2Stab: number =0;
  yStab: number=0;
  iterationsCountStab: number=0;

  x1Div: number=0;
  x2Div: number =0;
  yDiv: number=0;
  iterationsCountDiv: number=0;

  x1Speed: number=0;
  x2Speed: number =0;
  ySpeed: number=0;
  iterationsCountSpeed: number=0;

  x1: number=0;
  x2: number =0;
  y: number=0;
  iterationsCount: number=0;

  maxSteps: number=1000;
  constructor (protected service: ThirdLabCalculatorService){

  }
  MinimizeAll():void{
    this.MinimizeFunction();
    this.MinimizeFunctionMethod2();
    this.MinimizeFunctionmaxSpeed();
    this.MinimizeFunctionNewton();
    this.getChart(this.x1Stab);
  }

  MinimizeFunction(){
    let result = this.service.calculateUsingDiffAlpha(this.start, this.end, this.alpha, this.maxSteps, this.e);
    this.iterationsCountDiv = this.service.stepsCount/2-50;
    this.x1Div = result[0];

    this.x2Div = result[1];
    this.yDiv = this.service.calculateFunctionValue(this.x1Div, this.x2Div);
  }

  MinimizeFunctionMethod2(){
    let result = this.service.calculateUsingStableStep(this.start, this.end, this.alpha, this.maxSteps, this.e);
    this.iterationsCountStab = this.service.stepsCount;
    this.x1Stab = result[0];

    this.x2Stab = result[1];
    this.yStab = this.service.calculateFunctionValue(this.x1Stab, this.x2Stab);
  }

  MinimizeFunctionmaxSpeed(){
    let result = this.service.calculateUsingMaxSpeedmethod(this.start, this.end, this.alpha, this.maxSteps, this.e);
    this.iterationsCountSpeed = this.service.stepsCount;
    this.x1Speed = result[0];

    this.x2Speed = result[1];
    this.y = this.service.calculateFunctionValue(this.x1Speed, this.x2Speed);
  }

  MinimizeFunctionNewton(){
    let result = this.service.calculateUsingNewtonMethod(this.start, this.end, this.alpha, this.maxSteps, this.e*1000);
    this.iterationsCount = this.service.stepsCount;
    this.x1 = result[0];

    this.x2 = result[1];
    this.y = this.service.calculateFunctionValue(this.x1, this.x2);
  }

  functionValue(){
    let result = this.service.calculateFunctionValue(this.start, this.end);
    this.y=result;
  }

  getChart(x1: number): void{
    //this.data=-
    let data: any[]=[];
    for(let i=-5;i<=5;i+=0.2){
      data.push([i, this.service.calculateFunctionValue(x1, i), null, null, null, null])
    }
    data.push([this.x1Stab, null, this.yStab, null, null, null])
    data.push([this.x1Div, null, null, this.yDiv,  null, null])
    data.push([this.x1Speed, null,null, null, this.ySpeed, null])
    data.push([this.x1, null, null, null, null, this.y]);

    this.data=data;
  }
}
