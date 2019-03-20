import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBuddyWeeklyPage } from './my-buddy-weekly';

@NgModule({
  declarations: [
    MyBuddyWeeklyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBuddyWeeklyPage),
  ],
})
export class MyBuddyWeeklyPageModule {}
