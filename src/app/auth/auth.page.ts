import { Component, OnInit } from '@angular/core';
import { EnumKeysStorage } from '../core/enums/enum-keys-storage';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "./auth-service";


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
    {type: 'minLength', message: 'Coloca al menos 5 caracteres.'},
  ];
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
  ) {
    this.form = _fb.group({
      email: new  FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new  FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      register: new FormControl(false),
      name: new FormControl(''),
    });
    this.form.get('register').valueChanges.subscribe((value) => {
      this.validControl(value);
    });
  }

  ngOnInit() {
  }

  public onSave(): void {
    if (this.form.get('register').value) {
      this._authService.createUser
    } else {

    }
  }
  private validControl(valid: boolean): void {
    if (valid) {
      this.form.get('name').setValidators([Validators.required]);
    } else {
      this.form.get('name').setValidators(null);
    }
  }
  private setToken(data: string): void {
  }

}
