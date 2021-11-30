import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../models/game";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor() { }
  @Input() time: string;
@Input() data: Question;

  ngOnInit(): void {

  }

}
