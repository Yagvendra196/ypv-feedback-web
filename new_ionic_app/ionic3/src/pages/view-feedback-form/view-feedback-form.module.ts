import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewFeedbackFormPage } from './view-feedback-form';

@NgModule({
  declarations: [
    ViewFeedbackFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewFeedbackFormPage),
  ],
})
export class ViewFeedbackFormPageModule {}
