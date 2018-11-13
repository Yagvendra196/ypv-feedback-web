import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Constants from '../../app/constants';
import { LoginPage } from '../../pages/login/login';


/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
@Injectable()
export class LogoutPage {

	// Reference to the app's root nav
  //@ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  	//window.localStorage.removeItem('auth_token');
    //this.navCtrl.setRoot(LoginPage);
    //this.nav.setRoot( LoginPage )
    // Remove API token 
         //this.router.navigate(['LoginPage']);
         //this.navCtrl.setRoot('LoginPage');
  }

}
