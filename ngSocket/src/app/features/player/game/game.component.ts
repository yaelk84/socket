import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from "../../../core/socket.service";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
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

      this.showAnswers = true;
      this.correct = true;
    });

  }

  answer(a: string) {
    this.selectedAnswer = a;
    this.socketService.getSocket().emit('playerAnswer',a);
  }
}
