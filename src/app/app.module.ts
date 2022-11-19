import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LabSecondComponent } from './lab-second/lab-second.component';
import { LabsModule } from './labs/labs.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
