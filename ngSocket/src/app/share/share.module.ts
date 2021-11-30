import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RadioComponent} from "./radio/radio.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const shareComponents = [
  RadioComponent
];

@NgModule({
  declarations: [RadioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[RadioComponent]

})
export class ShareModule { }
