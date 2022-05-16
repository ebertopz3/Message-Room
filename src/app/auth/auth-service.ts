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

  public async authProvider(provider) {
    return await this.angularAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public async authUser(email: string, password: string) {
    try {
      return await this.angularAuth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  }
}
