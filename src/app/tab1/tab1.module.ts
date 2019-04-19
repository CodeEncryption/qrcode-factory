import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Toast } from '@ionic-native/toast/ngx';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path:'', component: Tab1Page},
      { path: ':info', component: Tab1Page },
    ])
  ],
  providers:[Base64ToGallery,Toast],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
