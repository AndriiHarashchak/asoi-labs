import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Lab4CalculatorService {
  //df = 0.75/16
  //N = Math.Round(3.3/df)
  //n = -N/2<n<N/2

  //fc = 2.5 + -0.35/2 = 2.
   fc=0;
   wc=0;
   alpha: number=0.54;
   N: number=0;
   normalizedTranzition: number=0;
  cut_frequency = 2.5
  transition_width = 1
  discretization_frequency = 16
  unequity = 0.75
  suppress = -35
  normalized_tranzition = 0.208
  coef_count = 40
  constructor() {
    let df = 0.75/16;
    this.coef_count = Math.ceil(3.3/df);
    this.N = Math.ceil(3.3/df)//+5;
    this.fc = (this.cut_frequency+0.75/2)/16;// 2.5+ (-0.35)/2;
    this.wc =  2*Math.PI*this.fc;//1.75;//2.5/2//00;
    //this.normalizedTranzition = 0.208;
  }

  getImpulseCoefs(): number[]{
        let coef_list = [];

        let zero_coef_d = 2*this.normalized_tranzition;
        let zero_w = 0.54 + 0.46 * Math.cos(0)
        let zero_coef = zero_coef_d * zero_w
        coef_list.push(zero_coef);

       for(let coef_index =0; coef_index< this.coef_count; ++coef_index){
            let n_w = 2 * Math.PI * coef_index * this.normalized_tranzition
            let current_coef_d = 2*this.normalized_tranzition * Math.sin(n_w) / n_w
            let current_w = 0.54 + 0.46 * Math.cos(2 * Math.PI * coef_index / (2*this.coef_count))
            let current_coef = current_coef_d * current_w
            if(Number.isNaN(current_coef)){
              current_coef=1;
            }
            coef_list.push(current_coef)
       }
        return coef_list
  }
  hdn(n: number): number{
    if(n!=0){
      return 2*this.fc* Math.sin(n*this.wc)/(n*this.wc);
    }else{
      return 2*this.fc;
    }
  }
  hn(n: number): number{
    return this.w_n(n)*this.hdn(n);
  }

  w_n(n: number): number{
    if(n< (-1)*this.funcN() || n> this.funcN()){
      return 0;
    }
    return this.alpha+ (1-this.alpha)*Math.cos(2*Math.PI*n/this.N);

  }
  getCoefs(): number[]{
    var arr=[];
    for(let i = (-1)*this.N/2; i< this.N/2; ++i){
      arr.push(this.hn(i));

    }
    return arr;
  }

  funcN(): number{
    return (this.N-1)/2;
  }

  xn(t: number): number {
    return 1 * Math.sin(2 * Math.PI * 0.25  * t) + 3 * Math.sin(2 * Math.PI * 1.5 * t) + 2.5 * Math.sin(2 * Math.PI * 5 * t);
  }
  xn1(t: number, w: number): number{
    return Math.sin(2*Math.PI*t*w);
  }
  yn(coefs: number[], n: number, w: number=0): number{
    let sum=0;
    for(let i=0; i< coefs.length; ++i){
      sum+=coefs[i]*this.xn(n-i);//, w
    }
    return sum;

  }

  getResponceFunction(coefs: number[],freq: number): number{
    let sum=0;
    for(let i=0; i< coefs.length; ++i){
      //sum+=coefs[i]*Math.cos((i+0.5)*freq/Math.PI);
      sum+=coefs[i]*Math.cos(i*freq*1/16000);
    }
    return sum;
  }
}
