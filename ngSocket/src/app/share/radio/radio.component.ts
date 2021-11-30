import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-radiooo',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  @Input() options: string[];
  @Input() title: string[]
  @Input() onlyText = false;
  @Output() update: EventEmitter<any> = new EventEmitter();
  control: FormControl;

  id: any ;
  constructor() { }

  ngOnInit(): void {

    console.log('options',this.options)
    this.id = new Date().getUTCMilliseconds();

    this.control = new FormControl();
  }

  onChange(val: string) {

    this.update.emit(val);

  }
  remove(){
    this.control.setValue('')
    this.update.emit('');
  }
}
