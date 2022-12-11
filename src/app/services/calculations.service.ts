import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor() { }

  _k: number = 0.618;
  iterationCount: number = 0;
  x: number = 0;
  calculateMinUsingGolden(start: number, end: number, e: number): [number, number] {
    let iterCount: number = 0;
    while (Math.abs(end - start) > e) {
      let x1 = start + (1 - this._k) * (end - start);
      let x2 = start + this._k * (end - start);
      let y1 = this._f(x1), y2 = this._f(x2);
      if (y1 < y2) {
        end = x2;
      } else if (y1 > y2) {
        start = x1;
      }
      iterCount++;
    }
    this.iterationCount = iterCount;
    this.x = start+ (end-start) / 2;
    return [this.x, this._f(this.x)];
  }

  calculateMinUsingFibonacci(start: number, end: number, e: number): [number, number] {
    let diff = (end - start) / e;
    let n = 0;
    let fibonacci = 0;
    while (fibonacci < diff) {
      fibonacci = this.getFibonacci(n);
      ++n;
    }
    this.iterationCount = n;
    let x1 = 0, x2 = 0;
    let a = start, b = end;
    for (let k = 0; k < n - 1; ++k) {
      if (k == 0) {
        x1 = start + this.getFibonacci(n - 2) / this.getFibonacci(n) * (end - start);
        x2 = start + this.getFibonacci(n - 1) / this.getFibonacci(n) * (end - start);
      }
      let y1 = this._f(x1), y2 = this._f(x2);
      if (y1 < y2) {
        b = x2;
        x2 = x1;
        x1 = a + this.getFibonacci(n - k - 2) / this.getFibonacci(n - k) * (b - a);
      } else if (y1 > y2) {
        a = x1;
        x1 = x2;
        x2 = a + this.getFibonacci(n - k - 1) / this.getFibonacci(n - k) * (b - a);
      }
    }
    return [x1, this._f(x1)];
  }

  _f(x: number): number {
    return Math.pow(x, 3) + 6 * Math.pow(x, 2) + 3 * x;
  }

  getFibonacci(n: number): number {
    let fn = 0;
    let sum1 = 1, sum2 = 0;

    for (let i = 1; i < n; i++) {
      fn = sum1 + sum2;
      sum2 = sum1;
      sum1 = fn;
    }
    return fn;
  }
}
