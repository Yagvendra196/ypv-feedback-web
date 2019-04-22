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
 * Generated class for the AddBuddyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-add-buddy',
  templateUrl: 'add-buddy.html',
})
export class AddBuddyPage {
	device_id: string;
	role_id: number;
	device_type: string;
	base_url: string;
	version_name: string;
  addBuddy : string[];
  dataFound:boolean;
  searchForm:FormGroup;

   constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, public loadingCtrl: LoadingController, public menu: MenuController,private alertCtrl: AlertController) {

         this.searchForm = formBuilder.group({
          keywords: ['', Validators.required],
        });

        	this.device_id = Constants.device_id;
        	this.role_id = Constants.role_id;
        	this.base_url = Constants.wsBaseUrl;
        	this.version_name = Constants.versionName;

          
  }

  ionViewDidLoad() {
         this.getData();
  }

  addBuddyFunction(userId){

    const loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
 
        loading.present();
          var url = this.base_url + 'userServices/setAddBuddies';
          let headers = new Headers();
          headers.append("Content-Type", "application/x-www-form-urlencoded");
          let httpBody = "access_token=" + localStorage.getItem('auth_token')+"&user_id="+userId;

            //console.log(httpBody);
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
                        this.getData();
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

  searchBuddy(){
    //console.log();
    let keyword = this.searchForm.value.keywords;

    const loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
 
        loading.present();
          var url = this.base_url + 'userServices/searchBuddy';
          let headers = new Headers();
          headers.append("Content-Type", "application/x-www-form-urlencoded");
          let httpBody = "access_token=" + localStorage.getItem('auth_token')+"&keywords="+keyword;

            //console.log(httpBody);
            this.http.post(url, httpBody, {
                  headers: headers
              })
              .subscribe(
                  data => {
                      let responseData = data["_body"];
                      var obj = JSON.parse(responseData)
                      if(obj.response == 'S'){
                        loading.dismiss();
                        this.addBuddy = obj.data;

                        console.log(this.addBuddy);
                      }else{
                        this.showErrorAlert();
                      }
                  }, error => {
                      console.log(error);
                  }
              );
  }

  filterBuddy(){
    console.log(this.searchForm.value.keywords);

                if (this.searchForm.value.keywords=='') {
                    this.getData();
                } 
  }

  getData(){
     var url = this.base_url + 'userServices/getAddBuddies';
          let headers = new Headers();
          headers.append("Content-Type", "application/x-www-form-urlencoded");
          let httpBody = "access_token=" + localStorage.getItem('auth_token');

            //console.log(httpBody);
            this.http.post(url, httpBody, {
                  headers: headers
              })
              .subscribe(
                  data => {
                      let responseData = data["_body"];
                      var obj = JSON.parse(responseData)
                      if(obj.response == 'S'){
                        this.addBuddy = obj.data;
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
