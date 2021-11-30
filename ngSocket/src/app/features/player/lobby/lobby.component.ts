import { Component, OnInit } from '@angular/core';
;
import { Router } from '@angular/router';
import {SocketService} from "../../../core/socket.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
socket;
  aftelogin;
  players;

  constructor(private socketService: SocketService, private route: Router) { }

  ngOnInit(): void {
    this.socketService.init();
    this.socket = this.socketService.getSocket();
;
    this.socket.on('updatePlayerLobby', data => {
      this.aftelogin = true;
      this.players = [...data];
    });

    this.socket.on('gameStartedPlayer', () => {
      this.route.navigate(['/game']);
    });
  }


  check() {
    this.socket.emit('check')
  }

}
