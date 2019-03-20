import { Component,ViewChild } from '@angular/core';
import { Platform, ModalController, Nav, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public onlineOffline: boolean = navigator.onLine;

  rootPage:any = LoginPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController ,private alertCtrl: AlertController) {
    platform.ready().then(() => {

     
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //statusBar.show();
     // let splash = modalCtrl.create(SplashPage);
      //splash.present();
      //splashScreen.show();
    });

    if (!navigator.onLine) {
    //Do task when no internet connection

    }

    window.addEventListener('offline', () => {
        let alert = this.alertCtrl.create({
          title: 'Connection Failed !',
          subTitle: 'There may be a problem in your internet connection. Please try again ! ',
          buttons: [{
          text: ('Okay')
          }]
        });
        alert.present();
    });

  }

}

