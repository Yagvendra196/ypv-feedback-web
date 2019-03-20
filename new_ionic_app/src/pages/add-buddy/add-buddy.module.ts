import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBuddyPage } from './add-buddy';

@NgModule({
  declarations: [
    AddBuddyPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBuddyPage),
  ],
})
export class AddBuddyPageModule {}
