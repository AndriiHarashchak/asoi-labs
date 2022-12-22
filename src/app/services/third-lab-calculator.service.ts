import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThirdLabCalculatorService {

  constructor() { }
  stepsCount: number = 0;
  alphaRes: number=0;
  calculateUsingStableStep(x1: number, x2: number, alpha: number, maxSteps: number, eps: number): [number, number] {
    let i = 0;
    while ((Math.abs(this.poxidnax1(x1, x2)) > eps || Math.abs(this.poxidnax2(x1, x2)) > eps) && i < maxSteps) {
      let x1Old = x1;
      x1 = x1 - alpha * this.poxidnax1(x1, x2);
      x2 = x2 - alpha * this.poxidnax2(x1Old, x2);
      ++i;
    }
    this.stepsCount = i;
    return [x1, x2];
  }

  calculateUsingDiffAlpha(x1: number, x2: number, alpha: number, maxSteps: number, eps: number): [number, number] {
    let alphax1 = alpha;
    let alphax2 = alpha;
    let i = 0;
    let xi = 0.3;
    let count = 0;
    while (Math.sqrt(Math.pow(this.poxidnax1(x1, x2), 2) + Math.pow(this.poxidnax2(x1, x2), 2)) > eps && i < maxSteps) {
      let x1Old = x1;
      //let x2Old = x2;
      let diffX1 = x1 - alphax1 * this.poxidnax1(x1, x2);
      while (this.calculateFunctionValue(diffX1, x2) - this.calculateFunctionValue(x1, x2) >= (-1) * xi * alphax1 * Math.pow(Math.abs(this.poxidnax1(x1, x2)), 2)) {
        alphax1 = alphax1 / 2;
        if (count++ > 50) {
          break;
        }
      }
      count = 0;
      let diffX2 = x2 - alphax2 * this.poxidnax2(x1, x2);
      while (this.calculateFunctionValue(x1, diffX2) - this.calculateFunctionValue(x1, x2) >= (-1) * xi * alphax2 * Math.pow(Math.abs(this.poxidnax2(x1, x2)), 2)) {
        alphax2 = alphax2 / 2;
        if (count++ > 50) {
          break;
        }
      }
      x1 = x1 - alphax1 * this.poxidnax1(x1, x2);
      x2 = x2 - alphax2 * this.poxidnax2(x1Old, x2);
      ++i;

    }
    this.stepsCount = i/2-50;
    this.alphaRes = alphax1;
    return [x1, x2];
  }

  calculateUsingMaxSpeedmethod(x1: number, x2: number, alpha: number, maxSteps: number, eps: number): [number, number] {
    let i = 0;
    while (Math.sqrt(Math.pow(this.poxidnax1(x1, x2), 2) + Math.pow(this.poxidnax2(x1, x2), 2)) > eps && i < maxSteps) { //(Math.abs(this.poxidnax1(x1, x2)) > eps || Math.abs(this.poxidnax2(x1, x2)) > eps) && i < maxSteps) {
      let x1Old = x1;
      alpha = this.getAlpha(x1, x2);
      x1 = x1 - alpha * this.poxidnax1(x1, x2);
      x2 = x2 - alpha * this.poxidnax2(x1Old, x2);
      ++i;
    }
    this.stepsCount = i;
    return [x1, x2];
  }

  calculateUsingNewtonMethod(x1: number, x2: number, alpha: number, maxSteps: number, eps: number): [number, number] {
    let i = 0;
    while (Math.sqrt(Math.pow(this.poxidnax1(x1, x2), 2) + Math.pow(this.poxidnax2(x1, x2), 2)) > eps && i < maxSteps) { //(Math.abs(this.poxidnax1(x1, x2)) > eps || Math.abs(this.poxidnax2(x1, x2)) > eps) && i < maxSteps) {
      let a = 1;
      let gradient = this.getGeadientUsingGesseMatrix(x1, x2);
      x1 -= a*gradient[0];
      x2 -= a*gradient[1];
      ++i;
    }
    this.stepsCount = i;
    return [x1, x2];
  }

  getGeadientUsingGesseMatrix(x1: number, x2: number): number[] {
    let matrix = [[12*x1*x1-4*x2+2, -4*x1],[2, -4*x1]];//df2/dx, df/dxdy df2/dydx, df2/dy
    let det = matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0];
    let m1 = [[matrix[1][1], -matrix[0][1]],[-matrix[1][0], matrix[0][0]]];

    let gradient= [this.poxidnax1(x1,x2), this.poxidnax2(x1,x2)];
    let result = [];
    result.push(1.0/det*(m1[0][0]*gradient[0]+m1[0][1]*gradient[1]));
    result.push(1.0/det*(m1[1][0]*gradient[0]+m1[1][1]*gradient[1]));
    //df2/dx = 12x1^2 -4x2+2
    //df2/dxdy = -4x
    //df2/dy2 = 2
    //df2/dydx = -4x1
    return result;
  }

  getAlpha(x1: number, x2: number): number {
    let min = 10000;
    let alphaNew = 0;
    for (let a = 0; a < 1; a += 0.05) {
      let curr = this.calculateFunctionValue(x1 - a * this.poxidnax1(x1, x2), x2 - a * this.poxidnax2(x1, x2));
      if (curr < min) {
        min = curr;
        alphaNew = a;
      }
    }
    return alphaNew;
  }

  poxidnax2(x1: number, x2: number): number {
    return 2 * (x2 - x1 * x1);
  }

  poxidnax1(x1: number, x2: number): number {
    return 4 * Math.pow(x1, 3) + (2 - 4 * x2) * x1 - 2;
  }
  calculateFunctionValue(x1: number, x2: number): number {
    return Math.pow(x2 - x1 * x1, 2) + Math.pow(1 - x1, 2);
  }



  RPCLogic(u1: number, u2: number, out: number): void {
    if (u1 == u2) {
      out = 0;
    }
    if (u1 == 3) {
      if (u2 == 2) {
        out = -1;
      }
      else {
        out = 1;
      }
    } else if (u1 == 2) {
      if (u2 == 3) {
        out = 1;
      } else {
        out = -1;
      }
    } else {
      if (u2 == 2) {
        out = 1;
      } else {
        out - 1;
      }
    }
  }
}
