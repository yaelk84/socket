import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'game',
    loadChildren: () => import('./features/player/game/game.module').then(m => m.GameModule)
  },
  {
    path: '',
    loadChildren: () => import('./features/player/lobby/lobby.module').then(m => m.LobbyModule)
  },
  {
    path: 'host',
    loadChildren: () => import('./features/host/host.module').then(m => m.HostModule)
  }


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
