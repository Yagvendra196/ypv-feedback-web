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



/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

	changePwdForm: FormGroup;
	device_id: string;
	role_id: number;
	device_type: string;
	base_url: string;
	version_name: string;
	dataFound:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, public loadingCtrl: LoadingController, public menu: MenuController,private alertCtrl: AlertController) {


	this.changePwdForm = formBuilder.group({
		new_password: ['', Validators.required],
		confirm_new_password: ['', Validators.required],
	});

	this.device_id = Constants.device_id;
    this.role_id = Constants.role_id;
    this.base_url = Constants.wsBaseUrl;
    this.version_name = Constants.versionName;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  doChangePwd(){

  	const loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

  	let new_password = this.changePwdForm.value.new_password;
  	let confirm_new_password = this.changePwdForm.value.confirm_new_password;

	var url = this.base_url + 'userServices/changePassword';
	let headers = new Headers();
	headers.append("Content-Type", "application/x-www-form-urlencoded");


	let httpBody = "access_token=" + localStorage.getItem('auth_token') + "&current_password=IGNORE" + "&role_id="+ this.role_id + "&device_type=" + localStorage.getItem('device_type') + "&new_password=" + new_password + "&device_id=" + this.device_id + "&confirm_new_password=" + confirm_new_password;

	this.http.post(url, httpBody, {
          headers: headers
      })
      .subscribe(
          data => {
              let responseData = data["_body"];
              var obj = JSON.parse(responseData)
              if(obj.response == 'S'){
                loading.dismiss();
                this.showSuccessAlert();
                this.dataFound = true;
              }else{
                this.dataFound = false;
              }
          }, error => {
              console.log(error);
          }
      );
  }

   showSuccessAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Buddy Add Successfully.',
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
