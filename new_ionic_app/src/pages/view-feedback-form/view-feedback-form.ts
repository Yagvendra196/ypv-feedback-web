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
 * Generated class for the ViewFeedbackFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-feedback-form',
  templateUrl: 'view-feedback-form.html',
})
export class ViewFeedbackFormPage {

	dataFound:boolean;	
	base_url:string;
  label_1:string;
  label_2:string;
  label_3:string;
  label_4:string;
  label_5:string;
  label_6:string;
  label_7:string;
  label_8:string;
  label_9:string;
  label_10:string;
  label_11:string;
  label_12:string;
  label_13:string;
  label_14:string;
  label_15:string;
  label_16:string;
  label_17:string;
  label_18:string;
  label_19:string;
  label_20:string;
  label_21:string;
  label_22:string;
  label_23:string;
  label_24:string;
  label_25:string;
  label_26:string;
  label_27:string;
  label_28:string;
  label_29:string;
  label_30:string;
  label_31:string;
  label_32:string;
  label_33:string;
  label_34:string;
  label_35:string;

  value_1 :string;
  value_2 :string;
  value_3 :string;
  value_4 :string;
  value_5 :string;
  value_6 :string;
  value_7 :string;
  value_8 :string;
  value_9 :string;
  value_10:string;
  value_11:string;
  value_12:string;
  value_13:string;
  value_14:string;
  value_15:string;
  value_16:string;
  value_17:string;
  value_18:string;
  value_19:string;
  value_20:string;
  value_21:string;
  value_22:string;
  value_23:string;
  value_24:string;
  value_25:string;
  value_26:string;
  value_27:string;
  value_28:string;
  value_29:string;
  value_30:string;
  value_31:string;
  value_32:string;
  value_33:string;
  value_34:string;
  value_35:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  	this.base_url = Constants.wsBaseUrl;
  	console.log(this.navParams.get('sp_userid'));

  	var url = this.base_url + 'userServices/view_feedback_fields';
          let headers = new Headers();
          headers.append("Content-Type", "application/x-www-form-urlencoded");
          let feedback_type = 'Weekly';
          let purpose = 'view';
          let httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&spiritual_buddie_user_id=" + this.navParams.get('sp_userid') + "&purpose=" + purpose + "&use_date_filter=1" + "&idWeek=" + this.navParams.get('idWeek');

          console.log(httpBody);
          this.http.post(url, httpBody, {
                headers: headers
            })
            .subscribe(
                data => {
                    let responseData = data["_body"];
                    var obj = JSON.parse(responseData)
                    console.log(obj);
                    if(obj.response == 'S'){
                      this.label_1 = obj.data[0].feedback_field_label;
                      this.label_2 = obj.data[1].feedback_field_label;
                      this.label_3 = obj.data[2].feedback_field_label;
                      this.label_4 = obj.data[3].feedback_field_label;
                      this.label_5 = obj.data[4].feedback_field_label;
                      this.label_6 = obj.data[5].feedback_field_label;
                      this.label_7 = obj.data[6].feedback_field_label;
                      this.label_8 = obj.data[7].feedback_field_label;
                      this.label_9 = obj.data[8].feedback_field_label;
                      this.label_10 = obj.data[9].feedback_field_label;
                      this.label_11 = obj.data[10].feedback_field_label;
                      this.label_12 = obj.data[11].feedback_field_label;
                      this.label_13 = obj.data[12].feedback_field_label;
                      this.label_14 = obj.data[13].feedback_field_label;
                      this.label_15 = obj.data[14].feedback_field_label;
                      this.label_16 = obj.data[15].feedback_field_label;
                      this.label_17 = obj.data[16].feedback_field_label;
                      this.label_18 = obj.data[17].feedback_field_label;
                      this.label_19 = obj.data[18].feedback_field_label;
                      this.label_20 = obj.data[19].feedback_field_label;
                      this.label_21 = obj.data[20].feedback_field_label;
                      this.label_22 = obj.data[21].feedback_field_label;
                      this.label_23 = obj.data[22].feedback_field_label;
                      this.label_24 = obj.data[23].feedback_field_label;
                      this.label_25 = obj.data[24].feedback_field_label;
                      this.label_26 = obj.data[25].feedback_field_label;
                      this.label_27 = obj.data[26].feedback_field_label;
                      this.label_28 = obj.data[27].feedback_field_label;
                      this.label_29 = obj.data[28].feedback_field_label;
                      this.label_30 = obj.data[29].feedback_field_label;
                      this.label_31 = obj.data[30].feedback_field_label;
                      this.label_32 = obj.data[31].feedback_field_label;
                      this.label_33 = obj.data[32].feedback_field_label;
                      this.label_34 = obj.data[33].feedback_field_label;
                      this.label_35 = obj.data[34].feedback_field_label;


                      this.value_1 = obj.data[0].user_feedback_field_value;
                      this.value_2 = obj.data[1].user_feedback_field_value;
                      this.value_3 = obj.data[2].user_feedback_field_value;
                      this.value_4 = obj.data[3].user_feedback_field_value;
                      this.value_5 = obj.data[4].user_feedback_field_value;
                      this.value_6 = obj.data[5].user_feedback_field_value;
                      this.value_7 = obj.data[6].user_feedback_field_value;
                      this.value_8 = obj.data[7].user_feedback_field_value;
                      this.value_9 = obj.data[8].user_feedback_field_value;
                      this.value_10 = obj.data[9].user_feedback_field_value;
                      this.value_11 = obj.data[10].user_feedback_field_value;
                      this.value_12 = obj.data[11].user_feedback_field_value;
                      this.value_13 = obj.data[12].user_feedback_field_value;
                      this.value_14 = obj.data[13].user_feedback_field_value;
                      this.value_15 = obj.data[14].user_feedback_field_value;
                      this.value_16 = obj.data[15].user_feedback_field_value;
                      this.value_17 = obj.data[16].user_feedback_field_value;
                      this.value_18 = obj.data[17].user_feedback_field_value;
                      this.value_19 = obj.data[18].user_feedback_field_value;
                      this.value_20 = obj.data[19].user_feedback_field_value;
                      this.value_21 = obj.data[20].user_feedback_field_value;
                      this.value_22 = obj.data[21].user_feedback_field_value;
                      this.value_23 = obj.data[22].user_feedback_field_value;
                      this.value_24 = obj.data[23].user_feedback_field_value;
                      this.value_25 = obj.data[24].user_feedback_field_value;
                      this.value_26 = obj.data[25].user_feedback_field_value;
                      this.value_27 = obj.data[26].user_feedback_field_value;
                      this.value_28 = obj.data[27].user_feedback_field_value;
                      this.value_29 = obj.data[28].user_feedback_field_value;
                      this.value_30 = obj.data[29].user_feedback_field_value;
                      this.value_31 = obj.data[30].user_feedback_field_value;
                      this.value_32 = obj.data[31].user_feedback_field_value;
                      this.value_33 = obj.data[32].user_feedback_field_value;
                      this.value_34 = obj.data[33].user_feedback_field_value;
                      this.value_35 = obj.data[34].user_feedback_field_value;



                    	this.dataFound = true;
                    }else{
                    	this.dataFound = false;
                    }
                    

                   
                }, error => {
                    console.log(error);
                }
            );
                 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewFeedbackFormPage');
  }
 
}
