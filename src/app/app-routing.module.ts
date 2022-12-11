import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabSecondComponent } from './lab-second/lab-second.component';
import { ThirdLabComponent } from './third-lab/third-lab.component';

const routes: Routes = [
  { path: "lab-2", component: LabSecondComponent },
  { path: "lab-3", component: ThirdLabComponent },
  { path: "", redirectTo: "/lab-2", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
