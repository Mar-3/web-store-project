import { Component, Output, SimpleChanges, ɵɵNgOnChangesFeature } from '@angular/core';
import { FlashMessagesService } from 'src/app/services/flashmessages.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-flashmessage',
  templateUrl: './flashmessage.component.html',
  styleUrls: ['./flashmessage.component.css']
})
export class FlashmessageComponent {
  flashMessages:any = [];

  constructor(private flashMessageService:FlashMessagesService) {
    this.flashMessageService.newMessageObservable$?.subscribe(
      (newMessage) => {this.add(newMessage)}
    )
  }
  // Add a new flash message to the list of 
  // flashmessages and set a 5 second
  // timer to delete it.
  add(newMessage:any) {
    this.flashMessages.push(newMessage);
    timer(4000).subscribe(
      () =>  this.flashMessages.shift()
      );
  }
}

