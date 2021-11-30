import { Component, OnInit } from '@angular/core';
import {SocketService} from "../../../../core/socket.service";

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {
showAnswers = true;
  correct = false;
  selectedAnswer='';
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
//Get results on last question
    this.socketService.getSocket().on('answerResult', function(data){
      if(data == true){
        this.correct = true;
      }
    });

    this.socketService.getSocket().on('questionOver', (data)=>{
      this.showAnswers = false;
      if(data.correctAnswer == this.selectedAnswer){
        this.correct = true;
      }
      this.selectedAnswer = '';
    });
    this.socketService.getSocket().on('nextQuestionPlayer', (data)=>{
      console.log("innnnn")
      this.showAnswers = true;
    });

  }

  answer(a: string) {
    this.selectedAnswer = a;
    this.socketService.getSocket().emit('playerAnswer',a);
  }
}
