import {Component, NgZone, OnInit} from '@angular/core';
import { EnumKeysStorage } from '../core/enums/enum-keys-storage';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth-service';
import {Storage} from '@capacitor/storage';
import {Router} from "@angular/router";
import firebase from "firebase/compat/app";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  public form: FormGroup;
  public email = [
    {type: 'required', message: 'El correo es requerido'},
    {type: 'email', message: 'Este email no es valido.'},
  ];
  public password = [
    {type: 'required', message: 'El password es requerido'},
    {type: 'minlength', message: 'Coloca al menos 5 caracteres.'},
  ];
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _zone: NgZone,
    private _router: Router,
  ) {
    this.form = _fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      register: [false],
    });
  }

  ngOnInit() {
  }

  public onSave(): void {
    if (this.form.get('register').value) {
      // eslint-disable-next-line no-underscore-dangle
      this._authService.createUser(this.form.getRawValue()).then((value: firebase.auth.UserCredential) => {
        if (value.user.email) {
          this.setUserAndToken(value);
          this.direct('/tabs/tab1');
        }
      });
    } else {
      // eslint-disable-next-line no-underscore-dangle
      this._authService.authUser(this.form.getRawValue()).then((res) => {
        if (res.user.email) {
          this.setUserAndToken(res);
          this.direct('/tabs/tab1');
        }
        console.log('datos de respuesta', res);
      });
    }
  }
  onGoogle(): void {
    // eslint-disable-next-line no-underscore-dangle
    this._authService.authProvider().then((res) => {
      if (res.user.email) {
        this.setUserAndToken(res);
        this.direct('/tabs/tab1');
      }
      console.log('datos de respuesta', res);
    });
  }

  /**
   * @description
   */
  private setUserAndToken(value: firebase.auth.UserCredential): void {
    Storage.set({key: EnumKeysStorage.user, value: JSON.stringify(value.user)});
    Storage.set({key: EnumKeysStorage.token, value: value.user.refreshToken});
  }
  private direct(direct): void {
    // eslint-disable-next-line no-underscore-dangle
    this._zone.run(() => {
      // eslint-disable-next-line no-underscore-dangle
      this._router.navigate([`${direct}`]);
    });
  }
}
