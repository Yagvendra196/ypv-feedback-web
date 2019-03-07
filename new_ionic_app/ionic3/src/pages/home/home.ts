import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';
import * as Constants from '../../app/constants';
import { MyBuddiesPage } from '../../pages/my-buddies/my-buddies';
import { ViewFeedbackPage } from '../../pages/view-feedback/view-feedback';
import { TranierFeedbackSelectDatePage } from '../../pages/tranier-feedback-select-date/tranier-feedback-select-date';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})

export class HomePage {

   version_name:string;
   Buddies_data: string[];
   buddiesArr: string[];
   device_id: string;
   role_id: number; 
   device_type:string;
   base_url:string;
   LoginerrorMsg:string;
   feedbackBuddies_data:string[];
   "lib": ["es2018"]
  

   
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,private alertCtrl: AlertController) {
  	this.device_id = Constants.device_id;
		this.role_id = Constants.role_id;
		this.base_url = Constants.wsBaseUrl;
    this.version_name = Constants.versionName;
  }

  ionViewDidLoad() {
    
  }

/*  getBuddiesList(pageName){
    const loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
    loading.present();
    let headers = new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    let httpBody = "access_token="+localStorage.getItem('auth_token')+"&version_name="+localStorage.getItem('version_name');
    var url = this.base_url + 'userServices/getMyBuddies';
    this.http.post(url, httpBody,{headers:headers})
    	.subscribe(
    		data => {
      			let responseData = data["_body"];
    			  var obj = JSON.parse(responseData);
      			if(obj.response == 'F'){
      				this.LoginerrorMsg = obj.message;
      			} else {
              loading.dismiss();
      				this.Buddies_data = obj.data;
              console.log(obj.data);
              this.navCtrl.push(MyBuddiesPage,{
                buddiesArr:this.Buddies_data,
                pageName:pageName
              });
				    }
       		}, error => {
       			console.log(error);
      		}
    );
  }*/

  getBuddiesList(pageName){
    this.navCtrl.push(MyBuddiesPage,{
                pageName:pageName
              });
  }


viewFeedbackBuddiesList(){
    const loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
    loading.present();
    let headers = new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    let httpBody = "access_token="+localStorage.getItem('auth_token');
    var url = this.base_url + 'userServices/getFeedbackBuddies';
    this.http.post(url, httpBody,{headers:headers})
      .subscribe(
        data => {
            let responseData = data["_body"];
            var obj = JSON.parse(responseData);

              console.log(this.version_name);
              if(this.version_name == obj.version_name){


            if(obj.response == 'F'){
              this.LoginerrorMsg = obj.message;
            } else {
              loading.dismiss();
              this.feedbackBuddies_data = obj.data;
              const mapped = Object.entries(obj.data).map(([sp_id, value]) => ({sp_id, value}));
              this.navCtrl.push(ViewFeedbackPage,{
                buddiesArr:mapped,
              });
            }
          }else{
            loading.dismiss();
            this.showErrorAlert();
          }

          }, error => {
            console.log(error);
          }
    );
  }

  trainerFeedbackForm(){
     this.navCtrl.push(TranierFeedbackSelectDatePage);
  }

     showErrorAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Notification',
      subTitle: 'Please update your app version.',
    });
    basicAlert.present();
  }

} 
