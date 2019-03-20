import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, MenuController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Constants from '../../app/constants';
import { HomePage } from '../../pages/home/home';
import 'rxjs/add/operator/catch';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

   films: Observable<any>; 
   countries: string[];
   device_id: string;
   role_id: number; 
   device_type:string;
   base_url:string;
   version_name:string;
   LoginerrorMsg:string;
   LoginForm: FormGroup; 
   	
   
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public http: Http, public menu: MenuController) {
  	this.LoginForm = formBuilder.group({
        email: ['', Validators.required],
        pwd: ['', Validators.required],
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

    //console.log(this.version_name);

  }

  ionViewDidLoad(){ } 


  loginFunction(){
    const loading = this.loadingCtrl.create({ 
          content: 'Please wait...'
        });
    loading.present();

    let headers = new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
  	let httpBody = "device_id="+this.device_id+"&role_id="+this.role_id+"&device_type="+this.device_type+"& username="+this.LoginForm.value.email+"&password="+this.LoginForm.value.pwd;
    //let httpBody = "device_id="+this.device_id+"&role_id="+this.role_id+"&device_type="+this.device_type+"& username=trainer@mailinator.com&password=123456";

    var url = this.base_url + 'userServices/login';
    this.http.post(url, httpBody,{headers:headers})
    	.subscribe(
    		data => {
      			let responseData = data["_body"];
    		  	var obj = JSON.parse(responseData)
      			if(obj.response == 'F'){
              loading.dismiss();
      				this.LoginerrorMsg = obj.message;
      			} else {
            let auth_token = '';
            let is_spritual_trainer = '';
            localStorage.setItem('auth_token', obj.data.access_token);
            localStorage.setItem('is_spritual_trainer', obj.data.is_spritual_trainer);
            localStorage.setItem('version_name',this.version_name);
            localStorage.setItem('device_type',this.device_type);
            localStorage.setItem('current_pwd',this.LoginForm.value.pwd);
            loading.dismiss();
            this.navCtrl.setRoot('MenuPage');
				}
       		}, error => {
       			console.log(error);
      		}
    );
  }

  forgot_passwd(){
    this.navCtrl.push(ForgotPasswordPage);
  }    

}
