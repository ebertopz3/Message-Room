import { Component } from '@angular/core';
import {Helper} from '../core/helper';
import {GetResult, Storage} from '@capacitor/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private helper: Helper
  ) {}
  public onClose(): void {
    Storage.clear().then(() => {
      this.helper.goDirect('/auth');
    });
  }
}
