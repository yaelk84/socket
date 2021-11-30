import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameComponent} from "./game.component";
import {GameRoutingModule} from "./game-routing.module";
import { GamePlayComponent } from './game-play/game-play.component';





@NgModule({
  declarations: [GameComponent, GamePlayComponent],
  exports: [
    GameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
