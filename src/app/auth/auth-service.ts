import {Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { IUser } from '../core/interfaces/user';
import { AlertController } from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private angularAuth: AngularFireAuth,
    public alertController: AlertController
  ) {
  }

  public async createUser(user: IUser) {
    try {
      return await this.angularAuth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (e) {
      this.presentAlertError('Registro de usuario','Error en los datos ingresados.').then();
    }
  }

  public async authProvider() {
    try {
      return await this.angularAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (e) {
      this.presentAlertError().then();
    }
  }

  public async authUser(user: IUser) {
    try {
      return await this.angularAuth.signInWithEmailAndPassword(user.email, user.password);
    } catch (e) {
      this.presentAlertError('Ingreso de usuario', 'Correo o clave incorrecta').then();
    }
  }

  public async closeSesion(): Promise<void> {
    return this.angularAuth.signOut();
  }
  private async presentAlertError(title?: string, text?: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title ? title : 'Error',
      /*subHeader: 'Subtitle',*/
      message: text ? text :'Error de al ingresar.',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
