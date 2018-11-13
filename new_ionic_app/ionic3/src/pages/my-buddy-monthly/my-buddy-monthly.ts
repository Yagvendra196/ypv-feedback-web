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
import {
    HomePage
} from '../../pages/home/home';
import {
    MyBuddiesPage
} from '../../pages/my-buddies/my-buddies';


/**
 * Generated class for the MyBuddyMonthlyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-buddy-monthly',
  templateUrl: 'my-buddy-monthly.html',
})
export class MyBuddyMonthlyPage {

  monthStart:string;
  yearStart:string;
  access_token:string;
  MonthlyForm: FormGroup;
  feedback_fields: string[];
  feedback_fields_51:string;
  feedback_fields_52:string;
  feedback_fields_53:string;
  feedback_fields_54:string;
  feedback_fields_55:string;
  feedback_fields_56:string;
  selected_date:string;
  device_id:string;
  role_id:number;
  base_url:string;
  version_name:string;
  userId:string;
  feedback_field_id_1:string;
  feedback_field_id_2:string;
  feedback_field_id_3:string;
  feedback_field_id_4:string;
  feedback_field_id_5:string;
  feedback_field_id_6:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, public loadingCtrl: LoadingController, public menu: MenuController,private alertCtrl: AlertController) {

    this.MonthlyForm = formBuilder.group({
      feedback_field_51:['', Validators.required],
      feedback_field_52:['', Validators.required],
      feedback_field_53:['', Validators.required],
      feedback_field_54:['', Validators.required],
      feedback_field_55:['', Validators.required],
      feedback_field_56:['', Validators.required],
    });

        this.device_id = Constants.device_id;
        this.role_id = Constants.role_id;
        this.base_url = Constants.wsBaseUrl;
        this.version_name = Constants.versionName;

        this.monthStart = this.navParams.get('monthStart');
        this.yearStart = this.navParams.get('yearStart');

        this.selected_date = this.yearStart+'-'+ this.monthStart +'-01 00:00:00';

          var url = this.base_url + 'userServices/feedback_fields';
          let headers = new Headers();
          headers.append("Content-Type", "application/x-www-form-urlencoded");
          let feedback_type = 2;
          let httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&user_id=" + this.navParams.get('userId') + "";
          this.http.post(url, httpBody, {
                headers: headers
            })
            .subscribe(
                data => {
                    let responseData = data["_body"];
                    var obj = JSON.parse(responseData)
                    this.feedback_fields = obj.data;
                    this.feedback_fields_51 = obj.data[0].feedback_field_label;
                    this.feedback_fields_52 = obj.data[1].feedback_field_label;
                    this.feedback_fields_53 = obj.data[2].feedback_field_label;
                    this.feedback_fields_54 = obj.data[3].feedback_field_label;
                    this.feedback_fields_55 = obj.data[4].feedback_field_label;
                    this.feedback_fields_56 = obj.data[5].feedback_field_label;

                    // CALL view_feedback_fields
                    let feedback_type1 = 'Monthly';
                    let purpose = 'edit';
                    let use_date_filter = 1;
                    var url1 = this.base_url + 'userServices/view_feedback_fields';
                    let httpBody1 = "feedback_type=" + feedback_type1 + "&access_token=" + localStorage.getItem('auth_token') + "&spiritual_buddie_user_id=" + this.navParams.get('userId') + "&selected_date=" +this.selected_date + "&purpose=" + purpose + "&use_date_filter=" + use_date_filter;
                    this.http.post(url1, httpBody1, {
                            headers: headers
                        })
                        .subscribe(
                            data => {
                                let responseData1 = data["_body"];
                                var objViewFeedback = JSON.parse(responseData1);
                                console.log(objViewFeedback);
                                if (objViewFeedback.response == 'S') {
                                    this.feedback_field_id_1 = objViewFeedback.data[0].user_feedback_field_value;
                                    this.feedback_field_id_2 = objViewFeedback.data[1].user_feedback_field_value;
                                    this.feedback_field_id_3 = objViewFeedback.data[2].user_feedback_field_value;
                                    this.feedback_field_id_4 = objViewFeedback.data[3].user_feedback_field_value;
                                    this.feedback_field_id_5 = objViewFeedback.data[4].user_feedback_field_value;
                                    this.feedback_field_id_6 = objViewFeedback.data[5].user_feedback_field_value;
                                   
                                }
                            }, error => {
                                console.log(error);
                            }
                        );
                }, error => {
                    console.log(error);
                }
            );
                   

  }

  ionViewDidLoad() {
  	this.monthStart = this.navParams.get('monthStart');
  	this.yearStart = this.navParams.get('yearStart');
    this.access_token = localStorage.getItem('auth_token');
    this.userId = this.navParams.get('userId');
  	/*console.log(this.monthStart);
  	console.log(this.yearStart);
  	console.log('ionViewDidLoad MyBuddyMonthlyPage');*/
  }

  feedbackMonthlySubmitFunction(){
    const loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
 
        loading.present();
    this.selected_date = this.yearStart+'-'+ this.monthStart +'-01 00:00:00';
    let httpBody2 = "feedback_field_51=" + this.MonthlyForm.value.feedback_field_51 + "&feedback_field_52=" + this.MonthlyForm.value.feedback_field_52 + "&feedback_field_53=" + this.MonthlyForm.value.feedback_field_53 + "&feedback_field_54=" + this.MonthlyForm.value.feedback_field_54 + "&feedback_field_55=" + this.MonthlyForm.value.feedback_field_55 + "&feedback_field_56=" + this.MonthlyForm.value.feedback_field_56 + "&user_id=" + this.userId + "&selected_date=" + this.selected_date + "&access_token=" + localStorage.getItem('auth_token') + "&feedback_type=Monthly";

      let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var url2 = this.base_url + 'userServices/feedbackMonthly';
        this.http.post(url2, httpBody2, {
                headers: headers
            })
            .subscribe(
                data => {
                    let responseData2 = data["_body"];
                    var obj = JSON.parse(responseData2)
                    if (obj.response == 'S') {
                        loading.dismiss();
                        this.showSuccessAlert();
                         //this.navCtrl.push(HomePage);
                        // THIS API FOR TO MAKE AGAIN MY BUDDIES PAGE SUCCESSFULLY SUBMIT THE FORM //
                        /*let httpBodyGetMyBuddies = "access_token=" + localStorage.getItem('auth_token') + "&version_name=" + localStorage.getItem('version_name');
                        var urlGetMyBuddies = this.base_url + 'userServices/getMyBuddies';
                        this.http.post(urlGetMyBuddies, httpBodyGetMyBuddies, {
                                headers: headers
                            })
                            .subscribe(
                                data => {
                                    let responseDataGetMyBuddies = data["_body"];
                                    var objGetMyBuddies = JSON.parse(responseDataGetMyBuddies);
                                    if (objGetMyBuddies.response == 'F') {
                                      
                                    } else {
                                        this.Buddies_data = objGetMyBuddies.data;
                                        this.navCtrl.push(MyBuddiesPage, {
                                            buddiesArr: this.Buddies_data
                                        });
                                    }
                                }, error => {
                                    console.log(error);
                                }
                            );*/
                        //API END
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

}
