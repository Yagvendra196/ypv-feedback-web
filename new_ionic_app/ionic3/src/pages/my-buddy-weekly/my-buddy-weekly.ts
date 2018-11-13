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
 * Generated class for the MyBuddyWeeklyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-my-buddy-weekly',
    templateUrl: 'my-buddy-weekly.html',
})
export class MyBuddyWeeklyPage {
   

    weekStartDate: string;
    weekEndDate: string;
    weekID: string;
    access_token: string;
    userId: string;
    device_id: string;
    role_id: number;
    device_type: string;
    base_url: string;
    version_name: string;
    feedback_fields: string[];
    WeeklyForm: FormGroup;
    feedback_fields_0: string;
    feedback_fields_1: string;
    feedback_fields_2: string;
    feedback_fields_3: string;
    feedback_fields_4: string;
    feedback_fields_5: string;
    feedback_fields_6: string;
    feedback_fields_7: string;
    feedback_fields_8: string;
    feedback_fields_9: string;
    feedback_fields_10: string;
    feedback_fields_11: string;
    feedback_fields_12: string;
    feedback_fields_13: string;
    feedback_fields_14: string;
    feedback_fields_15: string;
    feedback_fields_16: string;
    feedback_fields_17: string;
    feedback_fields_18: string;
    feedback_fields_19: string;
    feedback_fields_20: string;
    feedback_fields_21: string;
    feedback_fields_22: string;
    feedback_fields_23: string;
    feedback_fields_24: string;
    feedback_fields_25: string;
    feedback_fields_26: string;
    feedback_fields_27: string;
    feedback_fields_28: string;
    feedback_fields_29: string;
    feedback_fields_30: string;
    feedback_fields_31: string;
    feedback_fields_32: string;
    feedback_fields_33: string;
    feedback_fields_34: string;
    Buddies_data: string[];
    feedback_field_label: string;
    feedback_field_1: string;
    feedback_field_id_1: string;
    feedback_field_id_2: string;
    feedback_field_id_3: string;
    feedback_field_id_4: string;
    feedback_field_id_5: string;
    feedback_field_id_6: string;
    feedback_field_id_7: string;
    feedback_field_id_8: string;
    feedback_field_id_9: string;
    feedback_field_id_10: string;
    feedback_field_id_11: string;
    feedback_field_id_12: string;
    feedback_field_id_13: string;
    feedback_field_id_14: string;
    feedback_field_id_15: string;
    feedback_field_id_16: string;
    feedback_field_id_17: string;
    feedback_field_id_18: string;
    feedback_field_id_19: string;
    feedback_field_id_20: string;
    feedback_field_id_21: string;
    feedback_field_id_22: string;
    feedback_field_id_23: string;
    feedback_field_id_24: string;
    feedback_field_id_25: string;
    feedback_field_id_26: string;
    feedback_field_id_27: string;
    feedback_field_id_28: string;
    feedback_field_id_29: string;
    feedback_field_id_30: string;
    feedback_field_id_31: string;
    feedback_field_id_32: string;
    feedback_field_id_33: string;
    feedback_field_id_34: string;
    feedback_field_id_35: string;



    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, public loadingCtrl: LoadingController, public menu: MenuController,private alertCtrl: AlertController) {
        this.WeeklyForm = formBuilder.group({
            feedback_field_1: ['', Validators.required],
            feedback_field_2: ['', Validators.required],
            feedback_field_3: ['', Validators.required],
            feedback_field_4: ['', Validators.required],
            feedback_field_5: ['', Validators.required],
            feedback_field_6: ['', Validators.required],
            feedback_field_7: ['', Validators.required],
            feedback_field_8: ['', Validators.required],
            feedback_field_9: ['', Validators.required],
            feedback_field_10: ['', Validators.required],
            feedback_field_11: ['', Validators.required],
            feedback_field_12: ['', Validators.required],
            feedback_field_13: ['', Validators.required],
            feedback_field_14: ['', Validators.required],
            feedback_field_15: ['', Validators.required],
            feedback_field_16: ['', Validators.required],
            feedback_field_17: ['', Validators.required],
            feedback_field_18: ['', Validators.required],
            feedback_field_19: ['', Validators.required],
            feedback_field_20: ['', Validators.required],
            feedback_field_21: ['', Validators.required],
            feedback_field_22: ['', Validators.required],
            feedback_field_23: ['', Validators.required],
            feedback_field_24: ['', Validators.required],
            feedback_field_25: ['', Validators.required],
            feedback_field_26: ['', Validators.required],
            feedback_field_27: ['', Validators.required],
            feedback_field_28: ['', Validators.required],
            feedback_field_29: ['', Validators.required],
            feedback_field_30: ['', Validators.required],
            feedback_field_31: ['', Validators.required],
            feedback_field_32: ['', Validators.required],
            feedback_field_33: ['', Validators.required],
            feedback_field_34: ['', Validators.required],
            feedback_field_35: ['', Validators.required]
        });

        this.device_id = Constants.device_id;
        this.role_id = Constants.role_id;
        this.base_url = Constants.wsBaseUrl;
        this.version_name = Constants.versionName;
        var url = this.base_url + 'userServices/feedback_fields';
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let feedback_type = 1;
        let httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&user_id=" + this.navParams.get('userId') + "";
        this.http.post(url, httpBody, {
                headers: headers
            })
            .subscribe(
                data => {
                    let responseData = data["_body"];
                    var obj = JSON.parse(responseData)
                    this.feedback_fields = obj.data;
                    this.feedback_fields_0 = obj.data[0].feedback_field_label;
                    this.feedback_fields_1 = obj.data[1].feedback_field_label;
                    this.feedback_fields_2 = obj.data[2].feedback_field_label;
                    this.feedback_fields_3 = obj.data[3].feedback_field_label;
                    this.feedback_fields_4 = obj.data[4].feedback_field_label;
                    this.feedback_fields_5 = obj.data[5].feedback_field_label;
                    this.feedback_fields_6 = obj.data[6].feedback_field_label;
                    this.feedback_fields_7 = obj.data[7].feedback_field_label;
                    this.feedback_fields_8 = obj.data[8].feedback_field_label;
                    this.feedback_fields_9 = obj.data[9].feedback_field_label;
                    this.feedback_fields_10 = obj.data[10].feedback_field_label;
                    this.feedback_fields_11 = obj.data[11].feedback_field_label;
                    this.feedback_fields_12 = obj.data[12].feedback_field_label;
                    this.feedback_fields_13 = obj.data[13].feedback_field_label;
                    this.feedback_fields_14 = obj.data[14].feedback_field_label;
                    this.feedback_fields_15 = obj.data[15].feedback_field_label;
                    this.feedback_fields_16 = obj.data[16].feedback_field_label;
                    this.feedback_fields_17 = obj.data[17].feedback_field_label;
                    this.feedback_fields_18 = obj.data[18].feedback_field_label;
                    this.feedback_fields_19 = obj.data[19].feedback_field_label;
                    this.feedback_fields_20 = obj.data[20].feedback_field_label;
                    this.feedback_fields_21 = obj.data[21].feedback_field_label;
                    this.feedback_fields_22 = obj.data[22].feedback_field_label;
                    this.feedback_fields_23 = obj.data[23].feedback_field_label;
                    this.feedback_fields_24 = obj.data[24].feedback_field_label;
                    this.feedback_fields_25 = obj.data[25].feedback_field_label;
                    this.feedback_fields_26 = obj.data[26].feedback_field_label;
                    this.feedback_fields_27 = obj.data[27].feedback_field_label;
                    this.feedback_fields_28 = obj.data[28].feedback_field_label;
                    this.feedback_fields_29 = obj.data[29].feedback_field_label;
                    this.feedback_fields_30 = obj.data[30].feedback_field_label;
                    this.feedback_fields_31 = obj.data[31].feedback_field_label;
                    this.feedback_fields_32 = obj.data[32].feedback_field_label;
                    this.feedback_fields_33 = obj.data[33].feedback_field_label;
                    this.feedback_fields_34 = obj.data[34].feedback_field_label;
                    // CALL view_feedback_fields
                    let feedback_type1 = 'Weekly';
                    let purpose = 'edit';
                    let use_date_filter = 1;
                    var url1 = this.base_url + 'userServices/view_feedback_fields';
                    let httpBody1 = "feedback_type=" + feedback_type1 + "&access_token=" + localStorage.getItem('auth_token') + "&spiritual_buddie_user_id=" + this.navParams.get('userId') + "&idWeek=" + this.navParams.get('weekID') + "&purpose=" + purpose + "&use_date_filter=" + use_date_filter;
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
                                    this.feedback_field_id_7 = objViewFeedback.data[6].user_feedback_field_value;
                                    this.feedback_field_id_8 = objViewFeedback.data[7].user_feedback_field_value;
                                    this.feedback_field_id_9 = objViewFeedback.data[8].user_feedback_field_value;
                                    this.feedback_field_id_10 = objViewFeedback.data[9].user_feedback_field_value;
                                    this.feedback_field_id_11 = objViewFeedback.data[10].user_feedback_field_value;
                                    this.feedback_field_id_12 = objViewFeedback.data[11].user_feedback_field_value;
                                    this.feedback_field_id_13 = objViewFeedback.data[12].user_feedback_field_value;
                                    this.feedback_field_id_14 = objViewFeedback.data[13].user_feedback_field_value;
                                    this.feedback_field_id_15 = objViewFeedback.data[14].user_feedback_field_value;
                                    this.feedback_field_id_16 = objViewFeedback.data[15].user_feedback_field_value;
                                    this.feedback_field_id_17 = objViewFeedback.data[16].user_feedback_field_value;
                                    this.feedback_field_id_18 = objViewFeedback.data[17].user_feedback_field_value;
                                    this.feedback_field_id_19 = objViewFeedback.data[18].user_feedback_field_value;
                                    this.feedback_field_id_20 = objViewFeedback.data[19].user_feedback_field_value;
                                    this.feedback_field_id_21 = objViewFeedback.data[20].user_feedback_field_value;
                                    this.feedback_field_id_22 = objViewFeedback.data[21].user_feedback_field_value;
                                    this.feedback_field_id_23 = objViewFeedback.data[22].user_feedback_field_value;
                                    this.feedback_field_id_24 = objViewFeedback.data[23].user_feedback_field_value;
                                    this.feedback_field_id_25 = objViewFeedback.data[24].user_feedback_field_value;
                                    this.feedback_field_id_26 = objViewFeedback.data[25].user_feedback_field_value;
                                    this.feedback_field_id_27 = objViewFeedback.data[26].user_feedback_field_value;
                                    this.feedback_field_id_28 = objViewFeedback.data[27].user_feedback_field_value;
                                    this.feedback_field_id_29 = objViewFeedback.data[28].user_feedback_field_value;
                                    this.feedback_field_id_30 = objViewFeedback.data[29].user_feedback_field_value;
                                    this.feedback_field_id_31 = objViewFeedback.data[30].user_feedback_field_value;
                                    this.feedback_field_id_32 = objViewFeedback.data[31].user_feedback_field_value;
                                    this.feedback_field_id_33 = objViewFeedback.data[32].user_feedback_field_value;
                                    this.feedback_field_id_34 = objViewFeedback.data[33].user_feedback_field_value;
                                    this.feedback_field_id_35 = objViewFeedback.data[34].user_feedback_field_value;
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
        this.weekStartDate = this.navParams.get('weekStartDate');
        this.weekEndDate = this.navParams.get('weekEndDate');
        this.weekID = this.navParams.get('weekID');
        this.access_token = localStorage.getItem('auth_token');
        this.userId = this.navParams.get('userId');
    }

    feedbackWeeklySubmitFunction() {
        const loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
 
        loading.present();
        let httpBody2 = "feedback_field_1=" + this.WeeklyForm.value.feedback_field_1 + "&feedback_field_2=" + encodeURIComponent(this.WeeklyForm.value.feedback_field_2) + "&feedback_field_3=" + this.WeeklyForm.value.feedback_field_3 + "&feedback_field_4=" + this.WeeklyForm.value.feedback_field_4 + "&feedback_field_5=" + this.WeeklyForm.value.feedback_field_5 + "&feedback_field_6=" + this.WeeklyForm.value.feedback_field_6 + "&feedback_field_7=" + this.WeeklyForm.value.feedback_field_7 + "&feedback_field_8=" + this.WeeklyForm.value.feedback_field_8 + "&feedback_field_9=" + this.WeeklyForm.value.feedback_field_9 + "&feedback_field_10=" + this.WeeklyForm.value.feedback_field_10 + "&feedback_field_11=" + this.WeeklyForm.value.feedback_field_11 + "&feedback_field_12=" + this.WeeklyForm.value.feedback_field_12 + "&feedback_field_13=" + this.WeeklyForm.value.feedback_field_13 + "&feedback_field_14=" + this.WeeklyForm.value.feedback_field_14 + "&feedback_field_15=" + this.WeeklyForm.value.feedback_field_15 + "&feedback_field_16=" + this.WeeklyForm.value.feedback_field_16 + "&feedback_field_17=" + this.WeeklyForm.value.feedback_field_17 + "&feedback_field_18=" + this.WeeklyForm.value.feedback_field_18 + "&feedback_field_19=" + this.WeeklyForm.value.feedback_field_19 + "&feedback_field_20=" + this.WeeklyForm.value.feedback_field_20 + "&feedback_field_21=" + this.WeeklyForm.value.feedback_field_21 + "&feedback_field_22=" + this.WeeklyForm.value.feedback_field_22 + "&feedback_field_23=" + this.WeeklyForm.value.feedback_field_23 + "&feedback_field_24=" + this.WeeklyForm.value.feedback_field_24 + "&feedback_field_25=" + this.WeeklyForm.value.feedback_field_25 + "&feedback_field_26=" + this.WeeklyForm.value.feedback_field_26 + "&feedback_field_27=" + this.WeeklyForm.value.feedback_field_27 + "&feedback_field_28=" + this.WeeklyForm.value.feedback_field_28 + "&feedback_field_29=" + this.WeeklyForm.value.feedback_field_29 + "&feedback_field_30=" + this.WeeklyForm.value.feedback_field_30 + "&feedback_field_31=" + this.WeeklyForm.value.feedback_field_31 + "&feedback_field_32=" + this.WeeklyForm.value.feedback_field_32 + "&feedback_field_33=" + this.WeeklyForm.value.feedback_field_33 + "&feedback_field_34=" + this.WeeklyForm.value.feedback_field_34 + "&feedback_field_35=" + this.WeeklyForm.value.feedback_field_35 + "&user_id=" + this.userId + "&idWeek=" + this.weekID + "&access_token=" + localStorage.getItem('auth_token') + "&feedback_type=Weekly";

        // console.log(httpBody2);

        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var url2 = this.base_url + 'userServices/feedbackWeekly';
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