import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabSecondComponent } from '../lab-second/lab-second.component';
import { CalculationsService } from '../services/calculations.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { FormsModule } from '@angular/forms';
import { ThirdLabComponent } from '../third-lab/third-lab.component';
import { FourLabComponent } from '../four-lab/four-lab.component';



@NgModule({
  declarations: [
    LabSecondComponent,
    ThirdLabComponent,
    FourLabComponent,
  ],
  imports: [
    CommonModule,
    GoogleChartsModule,
    FormsModule
  ],
  providers:[
    CalculationsService
  ]
})
export class LabsModule { }
