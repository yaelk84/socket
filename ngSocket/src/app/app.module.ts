import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {ShareModule} from "./share/share.module";





@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
        ReactiveFormsModule,
    ShareModule
  ],

  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
