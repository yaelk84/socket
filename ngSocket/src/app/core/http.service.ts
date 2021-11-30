import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

   base = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }


  addQuizToDb(){
    this.getQuizToDb().subscribe((data)=>{
      const index = data.length + 1;
      this.http.get('/asset/stub/addQuize');
      return of(true)
    })
  }
  getQuizToDb(): any{
     this.http.get(this.base +'/asset/stubs/quizes').pipe((data:any)=>{
       return of(data);

     })
  }
}

