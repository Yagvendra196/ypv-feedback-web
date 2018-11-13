import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBuddiesPage } from './my-buddies';

@NgModule({
  declarations: [
    MyBuddiesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBuddiesPage),
  ],
})
export class MyBuddiesPageModule {}
