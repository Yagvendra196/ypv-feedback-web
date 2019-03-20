import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    LoadingController,
    Platform,
    MenuController,
    AlertController
} from 'ionic-angular';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import 'rxjs/add/operator/catch';
import {
    Headers,
    Http
} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Constants from '../../app/constants';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
	forgotPwdForm: FormGroup;
	device_id: string;
	role_id: number;
	device_type: string;
	base_url: string;
	version_name: string;
	dataFound:boolean;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, public loadingCtrl: LoadingController, public menu: MenuController,private alertCtrl: AlertController) {

  	this.forgotPwdForm = formBuilder.group({
		email: ['', Validators.required]
	});

	this.device_id = Constants.device_id;
    this.role_id = Constants.role_id;
    this.base_url = Constants.wsBaseUrl;
    this.version_name = Constants.versionName;
    if(platform.is('android')){
    	this.device_type = 'android';
    }
    if(platform.is('ios')){
    	this.device_type = 'ios';
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }


   doForgotPwd(){

  	const loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
  	loading.present();
  	let email_id = this.forgotPwdForm.value.email;

  
	var url = this.base_url + 'userServices/forgot_password';
	let headers = new Headers();
	headers.append("Content-Type", "application/x-www-form-urlencoded");

	let httpBody = "email="+email_id;
	this.http.post(url, httpBody, {
          headers: headers
      })
      .subscribe(
          data => {
              let responseData = data["_body"];
              var obj = JSON.parse(responseData)
              if(obj.response == 'S'){
      				this.forgotPwdForm.reset();
      				loading.dismiss();
      				this.showSuccessAlert();
      				this.navCtrl.push(LoginPage);
              }else{
              	this.showErrorAlert();
              }
          }, error => {
              console.log(error);
          }
      );
  }

   showSuccessAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Email Sent Successfully.',
      buttons: ['OK']
    });
    basicAlert.present();
  }
  showErrorAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error in network, Please try again later!.',
      buttons: ['OK']
    });
    basicAlert.present();
  }

}
