import {Component, OnInit} from '@angular/core';
import {IUser} from '../core/interfaces/user';
import {Helper} from '../core/helper';
import {MessageService} from '../core/services/message-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public user: IUser;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private helper: Helper,
    private messages: MessageService,
  ) {
    helper.generateDataUser().then((data) => {
      this.user = data;
    });
  }

  ngOnInit() {
    this.subscriptions.add(this.messages.listenDataMessages);
   /* this.messages.listenChat((chat) => {
      console.log('datos del chat', chat);
    });*/
  }
}
