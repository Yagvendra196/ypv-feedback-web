import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, MenuController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Constants from '../../app/constants';
import { TranierFeedbackSelectDatePage } from '../../pages/tranier-feedback-select-date/tranier-feedback-select-date';
import { HomePage } from '../../pages/home/home';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
 

/**
 * Generated class for the TranierFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tranier-feedback',
  templateUrl: 'tranier-feedback.html',
})
export class TranierFeedbackPage {
	access_token: string;
	userId: string;
	device_id: string;
	role_id: number;
	device_type: string;
	base_url: string;
	version_name: string;
	TranierForm: FormGroup;
	feedback_field_id_62:string;
	feedback_field_id_63:string;
	feedback_field_id_64:string;
	feedback_field_id_65:string;
	feedback_field_id_66:string;
	feedback_field_id_67:string;
	feedback_field_id_68:string;
	feedback_field_id_69:string;
	selected_date:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, public loadingCtrl: LoadingController, public menu: MenuController,private alertCtrl: AlertController) {

		  	


        this.TranierForm = formBuilder.group({
          feedback_field_62:['', Validators.required],
          feedback_field_63:['', Validators.required],
          feedback_field_64:['', ''],
          feedback_field_65:['', ''],
          feedback_field_66:['', ''],
          feedback_field_67:['', ''],
          feedback_field_68:['', ''],
          feedback_field_69:['', '']
        });


			this.device_id = Constants.device_id;
			this.role_id = Constants.role_id;
			this.base_url = Constants.wsBaseUrl;
			this.version_name = Constants.versionName;

  	      this.selected_date = this.navParams.get('yearStart')+'-'+ this.navParams.get('FinalmonthStart') +'-01 00:00:00';
  	      console.log(this.selected_date);
  	      var url = this.base_url + 'userServices/spritual_trainer_view_feedback_fields';
          let headers = new Headers();
          headers.append("Content-Type", "application/x-www-form-urlencoded");

          // CALL view_feedback_fields
        let feedback_type = 'for trainers';
      
        let httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&selected_date=" +this.selected_date;
        this.http.post(url, httpBody, {
                headers: headers
            })
            .subscribe(
                data => {
                    let responseData = data["_body"];
                    var objViewFeedback = JSON.parse(responseData);
                     if (objViewFeedback.version_name == this.version_name) {
                      if (objViewFeedback.response == 'S') {

                          const mapped = Object.entries(objViewFeedback.data).map(([sp_id, value]) => ({sp_id, value}));
                          
                          console.log(mapped[0].value['user_feedback_field_value']);
                          if(mapped[0]){

                            this.feedback_field_id_62 =  (mapped[0].value['user_feedback_field_value'] == 'undefined') ? '' :  mapped[0].value['user_feedback_field_value'];

                              
                          }if(mapped[1]){

                            this.feedback_field_id_63 =  (mapped[1].value['user_feedback_field_value'] == 'undefined') ? '' :  mapped[1].value['user_feedback_field_value'];

                          
                          }if(mapped[2]){

                            this.feedback_field_id_64 =  (mapped[2].value['user_feedback_field_value'] == 'undefined') ? '' :  mapped[2].value['user_feedback_field_value'];
                            
                            //this.feedback_field_id_64 = mapped[2].value['user_feedback_field_value'];
                          }if(mapped[3]){

                            this.feedback_field_id_65=  (mapped[3].value['user_feedback_field_value'] == 'undefined') ? '' :  mapped[3].value['user_feedback_field_value'];

                            //this.feedback_field_id_65 = mapped[3].value['user_feedback_field_value'];
                          }if(mapped[4]){

                            this.feedback_field_id_66 =  (mapped[4].value['user_feedback_field_value'] == 'undefined') ? '' :  mapped[4].value['user_feedback_field_value'];


                            //this.feedback_field_id_66 = mapped[4].value['user_feedback_field_value'];
                          }if(mapped[5]){

                            this.feedback_field_id_67 =  (mapped[5].value['user_feedback_field_value'] == 'undefined') ? '' :  mapped[5].value['user_feedback_field_value'];

                            //this.feedback_field_id_67 = mapped[5].value['user_feedback_field_value'];
                          }if(mapped[6]){

                            this.feedback_field_id_68 =  (mapped[6].value['user_feedback_field_value'] == 'undefined') ? '' :  mapped[6].value['user_feedback_field_value'];

                            //this.feedback_field_id_68 = mapped[6].value['user_feedback_field_value'];
                          }if(mapped[7]){

                            this.feedback_field_id_69 =  (mapped[7].value['user_feedback_field_value'] == 'undefined') ? '' :  mapped[7].value['user_feedback_field_value'];

                            //this.feedback_field_id_69 = mapped[7].value['user_feedback_field_value'];
                          }
                      }
                    }else{
                      //loading.dismiss();
                      this.showErrorVersionAlert();
                      this.navCtrl.pop();
                    }

                }, error => {
                    console.log(error);
                }
            );   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranierFeedbackPage');
  }

  TranierFormData() {

  	const loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
 
        loading.present();
	
    let httpBody = "feedback_field_62=" + this.TranierForm.value.feedback_field_62 + "&feedback_field_63=" + this.TranierForm.value.feedback_field_63 + "&feedback_field_64=" + this.TranierForm.value.feedback_field_64 + "&feedback_field_65=" + this.TranierForm.value.feedback_field_65 + "&feedback_field_66=" + this.TranierForm.value.feedback_field_66 + "&feedback_field_67=" + this.TranierForm.value.feedback_field_67 + "&feedback_field_68=" + this.TranierForm.value.feedback_field_68 + "&feedback_field_69=" + this.TranierForm.value.feedback_field_69 + "&role_id=" + this.role_id + "&selected_date=" + this.selected_date + "&access_token=" + localStorage.getItem('auth_token') + "&device_id=" + this.device_id + "&device_type=" + localStorage.getItem('device_type');

    	let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var url = this.base_url + 'userServices/spritual_trainer_feedback_fields';
        this.http.post(url, httpBody, {
                headers: headers
            })
            .subscribe(
                data => {
                    let responseData2 = data["_body"];
                    var obj = JSON.parse(responseData2)
                    if (obj.response == 'S') {
                        loading.dismiss();
                        this.showSuccessAlert();
                        this.navCtrl.pop();
                        
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
      subTitle: 'Your Feedback is successfully submitted.',
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

  showErrorVersionAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Notification',
      subTitle: 'Please update your app version.'
    });
    basicAlert.present();
  }

}
