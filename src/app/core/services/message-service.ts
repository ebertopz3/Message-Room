import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { IMessage } from '../interfaces/message';
import {AngularFireDatabase, AngularFireList, SnapshotAction} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MessageService {

  public messagesRef: AngularFireList<IMessage>;
  public newMessagesRef: AngularFireList<IMessage>;
  constructor(
    private fireDataBase: AngularFireDatabase
  ) {
    this.messagesRef = fireDataBase.list<IMessage>('/chat');
  }
  public creteMessage(messagge: IMessage): firebase.database.ThenableReference {
    try {
      return this.messagesRef.push(messagge);
    } catch (e) {
      console.log('error en crear', e);
    }
  }
  public getAllChat(call: (data) => void): AngularFireList<IMessage> {
    try {
      return this.messagesRef;
    } catch (e) {
      console.log('error en traer todo', e);
    }
  }

  public updateMessage(id: string, message: IMessage): Promise<void> {
    try {
      return this.messagesRef.update(id, message);
    } catch (e) {
      console.log('error en actualizar', e);
    }
  }

  public deleteMessage(id: string): Promise<void> {
    try {
      return this.messagesRef.remove(id);
    }catch (e) {
      console.log('error en borrar', e);
    }
  }

  public listenDataMessages(call?: (data: SnapshotAction<IMessage>[]) => void): Observable<SnapshotAction<IMessage>[]> {
    return this.messagesRef.snapshotChanges();
  }
  public onCreateNewChat(chat: string): Observable<SnapshotAction<IMessage>[]> {
    this.newMessagesRef = this.fireDataBase.list<IMessage>(`/${chat}`);
    return this.newMessagesRef.snapshotChanges();
  }

  public createInMessage(message: IMessage): firebase.database.ThenableReference {
    return this.newMessagesRef.push(message);
  }
}
