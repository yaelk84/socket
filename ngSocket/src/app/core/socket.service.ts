import { Injectable } from '@angular/core';
import {io} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  constructor() { }

  init(){
    if(!this.socket){
      this.socket = io('127.0.0.1:3000');
    }


  }
  getSocket(){
    return this.socket;
  }
}
