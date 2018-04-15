import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AppNgrxImageZoomComponent } from './components/ngrxImageZoom/ngrxImageZoom.component';
import { AppNgrxZoomDirective } from './directives/ngrxZoom/ngrxZoom.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppNgrxImageZoomComponent,
    AppNgrxZoomDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
