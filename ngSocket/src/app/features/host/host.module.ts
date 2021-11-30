import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostRoutingModule } from './host-routing.module';
import { CreateComponent } from './create/create.component';
import {GameComponent} from "./game/game.component";
import {QuestionsComponent} from "./game/questions/questions.component";
import {PlayersComponent} from "./game/players/players.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShareModule} from "../../share/share.module";
import {LoginComponent} from "./login/login.component";







@NgModule({
  declarations: [CreateComponent, QuestionsComponent, PlayersComponent, GameComponent, LoginComponent],
  exports: [
    QuestionsComponent,
    PlayersComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    HostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,

  ]
})
export class HostModule { }
