import {Component, Input, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() socket;
  nameModel="";
  pinModel="";
  constructor() { }
  ngOnInit(): void {
  }
  login(){
    this.socket.emit('player-join',{name: this.nameModel,pin: +this.pinModel})
  }

}
