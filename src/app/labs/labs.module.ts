import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabSecondComponent } from '../lab-second/lab-second.component';
import { CalculationsService } from '../services/calculations.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LabSecondComponent,
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
