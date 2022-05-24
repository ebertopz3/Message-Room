import {Component, OnInit} from '@angular/core';
import {ViewDidEnter} from '@ionic/angular';
import {Helper} from '../core/helper';
import {EnumKeysStorage} from '../core/enums/enum-keys-storage';
import {IUser} from '../core/interfaces/user';
import {IMessage} from '../core/interfaces/message';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageService} from '../core/services/message-service';
import {SnapshotAction} from '@angular/fire/compat/database';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, ViewDidEnter{

  public user: IUser;
  public messages: IMessage[] = [];
  public userIn: {name: string; id: string};
  public dateIn: Date;
  public form: FormGroup;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private helper: Helper,
    private fb: FormBuilder,
    private service: MessageService
  ) {
    this.dateIn = new Date();
    this.form = this.fb.group({message: ''});
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.helper.getStorage(EnumKeysStorage.userIn).then((user) => {
      if (user) {
        console.log(user.id);
        this.userIn = user;
        this.subscriptions.add(this.service.onCreateNewChat('chat' + this.userIn.id).subscribe((value) => {
          this.messages = this.generateMessages(value);
        }));
      } else {
        this.helper.generateDataUser().then((data) => {
          console.log(data.id);
          this.subscriptions.add(this.service.onCreateNewChat('chat' + data.id).subscribe((value) => {
            this.messages = this.generateMessages(value);
          }));
        });
      }
    });
    this.helper.generateDataUser().then((data) => {
      this.user = data;
    });
  }

  public validDay(date: string): boolean {
    const validDate = new Date(date);
    return (this.dateIn.getDay() === validDate.getDay());
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
    this.service.createInMessage(message).then(() => this.form.get('message').setValue(''));
  }
  private generateMessages(messages: (SnapshotAction<IMessage>)[]): IMessage[] {
    const data: IMessage[] = [];
    messages.forEach((value) => {
      data.push({...value.payload.val(), id: value.key});
    });
    return data;
  }
}
