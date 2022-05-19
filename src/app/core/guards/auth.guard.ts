import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {GetResult, Storage} from '@capacitor/storage';
import {EnumKeysStorage} from '../enums/enum-keys-storage';
import {Helper} from '../helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private helper: Helper
  ) {
  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validTokenInLogin();
  }
  canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.valiToken();
  }

  private async validTokenInLogin(): Promise<boolean> {
    const token: GetResult = await Storage.get({key: EnumKeysStorage.token});
    if (token.value) {
      this.helper.goDirect('/tabs/tab1');
      return false;
    }
    return true;
  }
  private async valiToken(): Promise<boolean> {
    const token: GetResult = await Storage.get({key: EnumKeysStorage.token});
    if (!token.value) {
      this.helper.goDirect('/auth');
      return false;
    }
    return true;
  }
}
