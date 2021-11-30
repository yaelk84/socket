import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-players-display',
  templateUrl: './players-display.component.html',
  styleUrls: ['./players-display.component.scss']
})
export class PlayersDisplayComponent implements OnInit {

 @Input() players:[];
  constructor() { }

  ngOnInit(): void {
  }

}
