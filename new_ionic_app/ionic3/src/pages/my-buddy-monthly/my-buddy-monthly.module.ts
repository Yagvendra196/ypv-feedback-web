import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBuddyMonthlyPage } from './my-buddy-monthly';

@NgModule({
  declarations: [
    MyBuddyMonthlyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBuddyMonthlyPage),
  ],
})
export class MyBuddyMonthlyPageModule {}
