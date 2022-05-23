import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from './interfaces/user';
import { GetResult, Storage } from '@capacitor/storage';
import { EnumKeysStorage } from './enums/enum-keys-storage';
import firebase from 'firebase/compat';


@Injectable({providedIn: 'root'})
export class Helper {
  constructor(
    private _zone: NgZone,
    private _router: Router,
  ) {
  }

  public goDirect(direct: string): void {
    // eslint-disable-next-line no-underscore-dangle
    this._zone.run(() => {
      // eslint-disable-next-line no-underscore-dangle
      this._router.navigate([`${direct}`]);
    });
  }

  public async getStorage(key: string): Promise<any> {
    const data: GetResult = await Storage.get({key});
    return JSON.parse(data.value);
  }
  public async setEstorage(key: string, data: any): Promise<void> {
    await Storage.set({key, value: data});
  }
  public async generateDataUser(): Promise<IUser> {
    const data: GetResult = await Storage.get({key: EnumKeysStorage.user});
    const user = JSON.parse(data.value);
    return {
      email: user.email,
      photo: user.photoURL ? user.photoURL : 'assets/img/user_blanck.png',
      id: user.uid,
      name: user.displayName ? user.displayName : user.email,
      password: user.uid,
      token: user.refreshToken,
    } as IUser;
  }
}
