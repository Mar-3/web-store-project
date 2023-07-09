import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';


// https://stackoverflow.com/questions/44066905/angular-2-send-data-from-component-to-service
// Above used as reference for data transfer in
// flash message service and components.

@Injectable({
  providedIn: 'root'
})
export class FlashMessagesService {
  
  newMessageObservable$: Observable<any> | undefined;
  private newMessageSubject = new Subject<any>();
  
  constructor() {
    this.newMessageObservable$ = this.newMessageSubject.asObservable(); 
  }
  
  newMessage(msg:string,type:string) {
    let color;
    if (type === 'success') {
      color = "flashmsg-success"; // Green color
    } else if (type === 'warning') {
      color = "flashmsg-warning"; /// Orange color
    } else {
      color = "flashmsg-error" // Red color
    }
    const newMessage = {
      'color': color,
      'msg': msg
    };
    this.newMessageSubject.next(newMessage);
  }
}
