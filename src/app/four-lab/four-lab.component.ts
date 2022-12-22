import { Component } from '@angular/core';
import { ChartType, Column } from 'angular-google-charts';
import { Lab4CalculaorNewService } from '../services/lab4-calculaor-new.service';
import { Lab4CalculatorService } from '../services/lab4-calculator.service';

@Component({
  selector: 'app-four-lab',
  templateUrl: './four-lab.component.html',
  styleUrls: ['./four-lab.component.scss']
})
export class FourLabComponent {

  chartType: ChartType = ChartType.LineChart;
  chartType2: ChartType = ChartType.ScatterChart;
  data: any[] = [];
  columns: Column[] = [
    { type: 'number', label: "n" },
    { type: 'number', label: "y(n)" },
    { type: 'number', label: "x(n)" },
    { type: 'number', label: "y(n)-x(n)" },
    // {type: 'number', label: "Ділення кроку"},
    // {type: 'number', label: "Найшвидший спуск"},
    // {type: 'number', label: "Ньютон"},
  ];
  columns2: Column[] = [
    { type: 'number', label: "freq" },
    { type: 'number', label: "A" },
  ];
  columns3: Column[] = [
    { type: 'number', label: "t" },
    { type: 'number', label: "x(t)" },
  ];
  columns4: Column[] = [
    { type: 'number', label: "y" },
    { type: 'number', label: "y(t)" },
  ];
  columns5: Column[] = [
    { type: 'number', label: "t" },
    { type: 'number', label: "y(t)-x(t)" },
  ];
  columns6: Column[] = [
    { type: 'number', label: "n" },
    { type: 'number', label: "h(n)" },
  ];
  data1: any[] = [];
  data2: any[] = [];
  data3: any[] = [];
  data4: any[] = [];
  data5: any[] = [];


  chartOptions: any = {
    hAxis: { title: 't' },
    vAxis: {title: 'y(y)'},
    curveType: 'function',
    explorer: {
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 15.0
    },
  }
  chartOptions2: any = {
    hAxis: { title: 'freq' },
    vAxis: { title: 'A' },
    curveType: 'function',
    explorer: {
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 15.0
    },
  }
  chartOptions3: any = {
    hAxis: { title: 'n' },
    vAxis: { title: 'x(n)' },
    curveType: 'function',
    explorer: {
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 15.0
    },
  }
  chartOptions4: any = {
    hAxis: { title: 'n' },
    vAxis: { title: 'y(n)' },
    curveType: 'function',
    explorer: {
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 15.0
    },
  }
  chartOptions5: any = {
    hAxis: { title: 'n' },
    vAxis: { title: 'x(n)-y(n)' },
    curveType: 'function',
    explorer: {
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 15.0
    },
  }
  chartOptions6: any = {
    hAxis: { title: 'n' },
    vAxis: { title: 'h(n)' },
    curveType: 'function',
    explorer: {
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 15.0
    },
  }
  constructor(protected service: Lab4CalculatorService, protected serviceNew: Lab4CalculaorNewService) {

  }
  coefs: number[] = []

  useFunc() {
    let coefs = this.serviceNew.getCoefs();
    this.coefs = coefs;
    let data: any[][] = [];
    let data2: any[][] = [];
    let data3: any[][] = [];
    let dat4: any[][] = [];

    let xArray: number[] = [];
    for (let i = 0; i < 1024; ++i) {
      let x = this.serviceNew.xn(i);
      xArray.push(x);
      //let y = this.serviceNew.getY(coefs, i);
      data3.push([i, x]);
    }
    this.data3 = data3;

    let yArray: number[] = [];
    for (let i = 0; i < 1024; ++i) {
      let y = this.serviceNew.getY(coefs, i, xArray);
      yArray.push(y);
      data2.push([i, y]);
    }
    this.data2 = data2;
    let nArray: number[] = [];
    for (let i = 0; i < 1024; ++i) {
      let n = yArray[i] - xArray[i];
      nArray.push(n);
      dat4.push([i, n]);
    }
    this.data4 = dat4;

    for (let i = 0; i < 1024; ++i) {
      data.push([i, yArray[i], xArray[i], nArray[i]]);
    }
    this.data = data;
    let data5 =[]

    for(let i=0; i < coefs.length; ++i){
      data5.push([i, coefs[i]]);
    }
    this.data5=data5;
    // for(let i=0; i< 200; i+= 5/10){
    //   let xn = this.serviceNew.xn(i)
    //   let y = this.serviceNew.getY(coefs, i);
    //   data.push([i, y, xn, y-xn]);
    //   data2.push([i, y]);
    //   data3.push([i, xn]);
    //   dat4.push([i, xn-y]);
    // }
    // this.data = data;
    // this.data2 = data2;
    // this.data3 = data3;
    // this.data4 = dat4;
    // data=[];
    //


    this.data1 = this.serviceNew.getResponceFunction(coefs);
    data = [];

  }
  // useFunc() {
  //   let coefs = this.service.getCoefs();
  //   this.coefs =coefs;
  //   let data: any[][] = [];
  //   let data1: any[][] = [];
  //   let w = 2;
  //   for(let i=0; i<5; i+=5/1024){
  //   //for(let i=0; i<1024; i+=1){
  //     let xn = this.service.xn(i);//,w
  //     let yn = this.service.yn(coefs, i);//,w
  //     //let resp = this.service.getResponceFunction(coefs, i);
  //     data.push([i, yn, xn,xn-yn ]);
  //     //data1.push([i, resp, null, null]);
  //   }
  //   for(let i=1; i< 720; i+=5){
  //     // if(i%2==0){
  //     //   continue;
  //     // }
  //     let resp = Math.abs(this.service.getResponceFunction(coefs, i));
  //     data1.push([i, resp]);

  //   }
  //   this.data = data;
  //   this.data1 = data1;



  // let xn = new Array(100);
  // let fn: number[][] = new Array(10 * 10 * 10);

  // let discret = 100;
  // for (let i = 0; i < Math.pow(10, 3); i++) {
  //   fn[i]= [];
  //   for (let t = 0; t <= discret; t++) {
  //     let step = 1 / ((i + 1) * 10 * discret) * t;
  //     xn[t] = this.service.xn1(step, (i + 1) * 10);
  //     fn[i].push(this.service.yn(coefs,xn[t]));//////calculatefn(xn)
  //   }
  //   //i++;
  // }
  // let achX = [];
  // let achY = [];

  // //console.log(fn[110]);
  // for (let i = 1; i < Math.pow(10,3); i++) {
  //   achY[i - 1] = this.getMax(fn[i-1]);
  //   achX[i - 1] = i * 10;
  // }

  // let data: number[][]=[];
  // for (let i = 0; i < achX.length; ++i) {
  //   data.push([achX[i], achY[i], ]);
  // }
  // this.data1=data;
  // }

  // getMax(arr: number[]): number{
  //   return arr.reduce((a, b) => Math.max(a, b), -Infinity);
  // }
}
