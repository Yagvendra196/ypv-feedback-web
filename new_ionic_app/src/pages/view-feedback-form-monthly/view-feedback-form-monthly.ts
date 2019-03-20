import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, MenuController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Constants from '../../app/constants';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

/**
 * Generated class for the ViewFeedbackFormMonthlyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-feedback-form-monthly',
  templateUrl: 'view-feedback-form-monthly.html', 
})
export class ViewFeedbackFormMonthlyPage {
	dataFound:boolean;	
	base_url:string;
  label_1:string;
  label_2:string;
  label_3:string;
  label_4:string;
  label_5:string;
  label_6:string;
  label_7:string;

  value_1:string;
  value_2:string;
  value_3:string;
  value_4:string;
  value_5:string;
  value_6:string;
  value_7:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

  	this.base_url = Constants.wsBaseUrl;
  	//console.log(this.navParams.get('sp_userid'));
  	//console.log(this.navParams.get('selected_date'));
    console.log(this.base_url);
  	

  	/*var url = this.base_url + 'userServices/view_feedback_fields';
          let headers = new Headers();
          headers.append("Content-Type", "application/x-www-form-urlencoded");
          let feedback_type = 'Monthly';
          let purpose = 'view';
          let httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&spiritual_buddie_user_id=" + this.navParams.get('sp_userid') + "&purpose=" + purpose + "&use_date_filter=1" + "&selected_date=" + this.navParams.get('selected_date');


          //console.log(httpBody);
          this.http.post(url, httpBody, {
                headers: headers
            })
            .subscribe(
                data => {
                    let responseData = data["_body"];
                    var obj = JSON.parse(responseData)
                    console.log(obj.data[0].user_feedback_field_id);
                    if(obj.response == 'S'){
                    	this.dataFound = true;
                    }else{
                    	this.dataFound = false;
                    }
                    

                   
                }, error => {
                    console.log(error);
                }
            );*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewFeedbackFormMonthlyPage');

    console.log(this.base_url);

    var url = this.base_url + 'userServices/view_feedback_fields';
          let headers = new Headers();
          headers.append("Content-Type", "application/x-www-form-urlencoded");
          let feedback_type = 'Monthly';
          let purpose = 'view';
          let httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&spiritual_buddie_user_id=" + this.navParams.get('sp_userid') + "&purpose=" + purpose + "&use_date_filter=1" + "&selected_date=" + this.navParams.get('selected_date');


          //console.log(httpBody);
          this.http.post(url, httpBody, {
                headers: headers
            })
            .subscribe(
                data => {
                    let responseData = data["_body"];
                    var obj = JSON.parse(responseData)
                   // console.log(obj.data[0]);


                    if(obj.response == 'S'){
                    this.label_1 = obj.data[0].feedback_field_label;
                    this.label_2 = obj.data[1].feedback_field_label;
                    this.label_3 = obj.data[2].feedback_field_label;
                    this.label_4 = obj.data[3].feedback_field_label;
                    this.label_5 = obj.data[4].feedback_field_label;
                    this.label_6 = obj.data[5].feedback_field_label;
                    this.label_7 = obj.data[6].feedback_field_label;


                    this.value_1 = obj.data[0].user_feedback_field_value;
                    this.value_2 = obj.data[1].user_feedback_field_value;
                    this.value_3 = obj.data[2].user_feedback_field_value;
                    this.value_4 = obj.data[3].user_feedback_field_value;
                    this.value_5 = obj.data[4].user_feedback_field_value;
                    this.value_6 = obj.data[5].user_feedback_field_value;
                    this.value_7 = obj.data[6].user_feedback_field_value;
                      this.dataFound = true;
                    }else{
                      this.dataFound = false;
                    }
                    

                   
                }, error => {
                    console.log(error);
                }
            );
  }

}
