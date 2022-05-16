import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {IUser} from '../core/interfaces/user';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private angularAuth: AngularFireAuth
  ) {
  }

  public async createUser(user: IUser) {
    return await this.angularAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  public async authProvider() {
    return await this.angularAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public async authUser(user: IUser) {
    try {
      return await this.angularAuth.signInWithEmailAndPassword(user.email, user.password);
    } catch (e) {
      console.log(e);
    }
  }
}
