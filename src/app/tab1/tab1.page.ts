import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IUser} from '../core/interfaces/user';
import {Helper} from '../core/helper';
import {MessageService} from '../core/services/message-service';
import {Subscription} from 'rxjs';
import {IMessage} from '../core/interfaces/message';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SnapshotAction} from '@angular/fire/compat/database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  @ViewChild('contentChat') contentChat: HTMLIonContentElement;
  public user: IUser;
  public messages: IMessage[] = [];
  public form: FormGroup;
  public dateIn: Date;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private helper: Helper,
    private _messages: MessageService,
    private _fb: FormBuilder,
  ) {
    this.form = _fb.group({message: ''});
    helper.generateDataUser().then((data) => {
      this.user = data;
    });
    this.dateIn = new Date();
  }

  ngOnInit() {
    // eslint-disable-next-line no-underscore-dangle
    this.subscriptions.add(this._messages.listenDataMessages().subscribe(
      (messages) => {
        this.messages = this.generateMessages(messages);
        this.fullScroll();
      }
    ));
   /* this.messages.listenChat((chat) => {
      console.log('datos del chat', chat);
    });*/
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onSendMessage(): void {
    const date = new Date();
    const message: IMessage = {
      message: this.form.get('message').value,
      name: this.user.name,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      create_at: date.toISOString(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      user_id: `${this.user.id}`,
    };
    // eslint-disable-next-line no-underscore-dangle
    this._messages.creteMessage(message)
      .then(() => this.form.get('message').setValue(''))
      .catch((e) => console.log('error', e));
  }
  public validDay(date: string): boolean {
    const validDate = new Date(date);
    return (this.dateIn.getDay() === validDate.getDay());
  }
  onSelectUser(data: IUser): void {

  }
  private generateMessages(messages: (SnapshotAction<IMessage>)[]): IMessage[] {
    const data: IMessage[] = [];
    messages.forEach((value) => {
      data.push({...value.payload.val(), id: value.key});
    });
    return data;
  }
  private fullScroll(): void {
    setTimeout(() => {
      this.contentChat.scrollToBottom(400).then();
    }, 800);
  }


}
