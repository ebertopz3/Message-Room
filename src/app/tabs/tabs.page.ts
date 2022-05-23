import { Component } from '@angular/core';
import {Helper} from '../core/helper';
import {GetResult, Storage} from '@capacitor/storage';
import {AuthService} from '../auth/auth-service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private helper: Helper,
    private service: AuthService
  ) {}
  public onClose(): void {
    this.service.closeSesion().then(() => {
      Storage.clear().then(() => {
        this.helper.goDirect('/auth');
      });
    });
  }
}
