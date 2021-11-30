import { Component, OnInit } from '@angular/core';
import {Accessories} from "../../../models/game";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  data:Accessories;

  ngOnInit(): void {
    this.data={shirt:"",glasses:"",gender:"",items:""}
  }

  updateShirt(select: string) {
    this.data.shirt = select;
  }
  updateGlasses(select: string) {
    this.data.glasses = select;
  }
  updateGender(select: string) {
    this.data.gender = select;
  }
  updateItem(select: string) {
    this.data.items = select;
  }
}
