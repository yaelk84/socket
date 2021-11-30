import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LobbyComponent} from "./lobby.component";
import {LobbyRoutingModule} from "./lobby-routing.module";
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import { PlayersDisplayComponent } from './players-display/players-display.component';




@NgModule({
  declarations: [LobbyComponent,LoginComponent, PlayersDisplayComponent],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    FormsModule
  ]
})
export class LobbyModule { }
