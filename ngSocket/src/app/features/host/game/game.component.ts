import { Component, OnInit } from '@angular/core';
import {Question, State} from "../../../models/game";
import {SocketService} from "../../../core/socket.service";

@Component({
  selector: 'app-game-host',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  games = [];
  state: State;
  stateEnum = State;
  questionData: Question;
  pin:string;
  time: number;
  timer;
  playerData;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.state = State.AllGame;
    this.socketService.init();
    this.socketService.getSocket().emit('getAllGame',(games)=>{
      this.games = games.Games;
    })
    this.socketService.getSocket().on('showGamePin',(data)=>{
      this.state = State.ChosenGame;
      this.pin = data.pin;

    })
    this.socketService.getSocket().on('gameQuestions',(data: Question)=>{
      this.questionData = data;
      this.state = this.stateEnum.Question;
      this.updateTimer();

    })
    this.socketService.getSocket().on('questionOver', (playerData, correct)=>{

      clearInterval(this.timer);
      this.state = this.stateEnum.Next;



    });
    this.socketService.getSocket().on('updatePlayerLobby', (playerData)=>{
      this.playerData = playerData




    });
    this.socketService.getSocket().on('GameOver',(data)=>{
      this.state = State.GameOver;

    })
  }

  chooseGame(id: any) {
    this.socketService.getSocket().emit('host-join',(id))
  }
  next(){
    this.socketService.getSocket().emit('nextQuestion',{pin:this.pin}); //Tell server to start new question
  }
  startGame() {
    this.socketService.getSocket().emit('host-join-game',{pin:this.pin});
  }
  updateTimer(){
    this.time = 20;
    let time = 20;
    this.timer = setInterval(()=>{
      time -= 1;
      this.time =  time;
      if(time == 0){
        this.socketService.getSocket().emit('timeUp',{pin:this.pin});
      }
    }, 1000);
  }

}


