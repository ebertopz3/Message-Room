import { IonicModule } from '@ionic/angular';
import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import localePy from '@angular/common/locales/es-PY';
import { Tab1PageRoutingModule } from './tab1-routing.module';
registerLocaleData(localePy, 'es');
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
  ],
  declarations: [Tab1Page],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class Tab1PageModule {}
