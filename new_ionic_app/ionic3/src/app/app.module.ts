import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SplashPage } from '../pages/splash/splash';
import { MyBuddiesPage } from '../pages/my-buddies/my-buddies';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SlimScroll } from 'angular-io-slimscroll';
import { MyBuddyWeeklyPage } from '../pages/my-buddy-weekly/my-buddy-weekly';
import { MyBuddyMonthlyPage } from '../pages/my-buddy-monthly/my-buddy-monthly'; 
import { ViewFeedbackPage } from '../pages/view-feedback/view-feedback';  
import { TranierFeedbackSelectDatePage } from '../pages/tranier-feedback-select-date/tranier-feedback-select-date';
import { TranierFeedbackPage } from '../pages/tranier-feedback/tranier-feedback';
import { ViewFeedbackFormPage } from '../pages/view-feedback-form/view-feedback-form';
import { ViewFeedbackFormMonthlyPage } from '../pages/view-feedback-form-monthly/view-feedback-form-monthly';
import { AddBuddyPage } from '../pages/add-buddy/add-buddy';
import { LoginPageModule } from '../pages/login/login.module';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';


@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    //LoginPage,
    MyBuddiesPage,
    SlimScroll,
    MyBuddyWeeklyPage,
    MyBuddyMonthlyPage,
    ViewFeedbackPage,
    TranierFeedbackSelectDatePage,
    TranierFeedbackPage,
    ViewFeedbackFormPage,
    ViewFeedbackFormMonthlyPage,
    AddBuddyPage,
    ForgotPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,
    LoginPage,
    MyBuddiesPage,
    MyBuddyWeeklyPage,
    MyBuddyMonthlyPage,
    ViewFeedbackPage,
    TranierFeedbackSelectDatePage,
    TranierFeedbackPage,
    ViewFeedbackFormPage,
    ViewFeedbackFormMonthlyPage,
    AddBuddyPage,
    ForgotPasswordPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}


