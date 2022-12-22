import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Lab4CalculaorNewService {

  fc: number = 0;
  N: number = 0;
  deltaF: number = 0;
  wc = (n: number) => { return 2 * Math.PI * this.fc };
  constructor() {
    this.deltaF = 0.75/16;
    //this.deltaF = 0.5 / 8;
    //this.N = Math.ceil(3.3 / this.deltaF);
    this.N = Math.ceil(3.1/this.deltaF);
    this.fc = (1.5 + (0.5 / 2)) / 8;
    //this.fc = (2.5+(0.75/2))/16;
  }

  w(n: number): number {
    //return 0.54 + 0.46 * Math.cos(2 * Math.PI * n / this.N);
    return 0.5+0.5*Math.cos(2*Math.PI*n/this.N);
  }

  hd(n: number): number {
    if (n !== 0)
      return 2 * this.fc * Math.sin(n * this.wc(n)) / (n * this.wc(n));
    return 2 * this.fc;
  }

  h(n: number): number {
    return this.hd(n) * this.w(n);
  }

  getCoefs(): number[] {
    let result: number[] = [];
    for (let i = 0; i < this.N; ++i) {
      result.push(this.h(i));
    }
    return result;//result.push(...result);
  }

  getY(coefs: number[], n: number, x: number[]): number {

    if(n<this.N){
      return 0;
    }
    let sum = 0;
    for (let i = 0; i < this.N; ++i) {
        sum += coefs[i] * (x[n-i]??0);
    }
    return sum;
  }

  xn(t: number): number {
    let discretFreq =16;
    return 0 * Math.sin(2 * Math.PI * 0.25 * (t/discretFreq)) + 3 * Math.sin(2 * Math.PI * 1.5 * (t/discretFreq)) + 2.5 * Math.sin(2 * Math.PI * 5 * (t/discretFreq));
  }

  getResponceFunction(coefs: number[]): number[][] {

    let result: any[][] = [];
    for (let k = 0; k < 10; k+=0.01) {
      let sum = 0;
      for (let i = 0; i < coefs.length; ++i) {
        //sum+=coefs[i]*Math.cos((i+0.5)*freq/Math.PI);
        sum += coefs[i] * Math.cos(i * k / Math.PI);
      }
      result.push([k, Math.log(Math.abs(sum))*20]);
    }

    return result;
  }
}
