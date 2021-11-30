import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../../../models/game";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  @Input() players:Player[]
  constructor() { }

  ngOnInit(): void {
  }

}
