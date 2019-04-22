import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    LoadingController,
    Platform,
    MenuController,
    AlertController
} from 'ionic-angular';
import * as Constants from '../../app/constants';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { MyBuddyWeeklyPage } from '../../pages/my-buddy-weekly/my-buddy-weekly';
import { MyBuddyMonthlyPage } from '../../pages/my-buddy-monthly/my-buddy-monthly';
import { AddBuddyPage } from '../../pages/add-buddy/add-buddy';


/**
 * Generated class for the MyBuddiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-buddies', 
  templateUrl: 'my-buddies.html',
})
export class MyBuddiesPage { 

  public week_start_date: string = "";
	dataArr:string[];	
	showHide: boolean;
	currentPerson:string;
	currentPersonForRadio:string;
	monthNames:string[];
	yearStart:number;
	monthStart:number;
	monthStartinWords:string;
  base_url:string;
  yearWeeks:string[];
  weekID:string;
  weekStartDate:string;
  weekEndDate:string;
  wsd_arr:string[];
  wed_arr:string[];
  sd_arr:string;
  ed_arr:string;
  test:string[];
  nextCount:number;
  wsdNumberArr:string;
  checkOpenDiv:number;
  pageName:number;
  Buddies_data: string[];
   buddiesArr: string[];
   version_name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, public loadingCtrl: LoadingController, public menu: MenuController,private alertCtrl: AlertController) {
  	
    this.base_url = Constants.wsBaseUrl;
    this.version_name = Constants.versionName;
    //console.log(this.version_name);
  	this.monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  	this.yearStart = (new Date()).getFullYear();
  	this.monthStart = (new Date()).getMonth();
  	this.monthStartinWords = this.monthNames[ this.monthStart ];

  	var url = this.base_url + 'userServices/getYearWeek';
    let headers = new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    let httpBody = "year="+this.yearStart;
    this.http.post(url, httpBody,{headers:headers})
      .subscribe(
        data => {
              let responseData = data["_body"];
              var obj = JSON.parse(responseData)
              this.yearWeeks = obj.yearWeeks;
              this.weekID = obj.week.idWeek;
              this.weekStartDate = obj.week.week_start_date;
              this.weekEndDate = obj.week.week_end_date;
          }, error => {
            console.log(error);
          }
    );
}

  ionViewDidLoad() {
  	this.pageName = this.navParams.get('pageName');
  }

  changeShowStatus(user_id,hide){
  	if (this.currentPerson === user_id){
  	 	if(hide == 1){
        this.currentPersonForRadio = null;
        this.currentPerson = null;
        return
      }else{
        this.showHide = !this.showHide;
        return;
      }
     }
     this.checkOpenDiv = 1; 
  	 this.currentPersonForRadio = null;
  	 this.currentPerson = user_id;
  }

  changeShowStatusRadio(feedback){
  	 if (this.currentPersonForRadio === feedback){
  	 	//return;
  	 	this.showHide = !this.showHide;

  	 	return;
  	 } 
  	 this.currentPersonForRadio = feedback;
  }

  getPreviousMonth(){
  	if (this.monthStart==0) {
	    this.yearStart = this.yearStart-1;
	    this.monthStart = 11;
	} else {
	    this.monthStart = this.monthStart-1;
	}
	this.monthStartinWords = this.monthNames[ this.monthStart ];
  }

 
  getNextMonth(){
	if (this.monthStart==11) {
        this.yearStart = this.yearStart+1;
        this.monthStart = 0;
    } else {
        this.monthStart = this.monthStart+1;
    }
    this.monthStartinWords = this.monthNames[ this.monthStart ];
  }


  getPreviousWeek(){
      let wsd_arr = this.weekStartDate.split('/');
      let wed_arr = this.weekEndDate.split('/');
      let length  = this.yearWeeks.length;
      let previousCount = this.yearWeeks.length;
        this.yearWeeks.forEach(item => {
          let sd_arr =  item['week_start_date'].split('/');
          let ed_arr = item['week_end_date'].split('/');
          //console.log(sd_arr);
          if ( (wsd_arr[0] == ed_arr[0]) && (wsd_arr[1] == ed_arr[1]) ) {
               if (previousCount == length) {
                   let year  = parseInt(wsd_arr[2]) - 1;
                   let headers = new Headers();
                    headers.append("Content-Type","application/x-www-form-urlencoded");
                    let httpBody = "year="+this.yearStart;
                    var url = this.base_url + 'userServices/getYearWeek';
                    this.http.post(url, httpBody,{headers:headers})
                    .subscribe(
                      data => {
                            let responseData = data["_body"];
                            var obj = JSON.parse(responseData);
                            this.yearWeeks = obj.yearWeeks;
                            this.getPreviousWeek();
                        }, error => {
                          console.log(error);
                        }
                  );
               }
                this.weekID = item['idWeek'];
                this.weekStartDate = item['week_start_date'];
                this.weekEndDate = item['week_end_date'];
          }
          
          previousCount--;
        });
  }
  getNextWeek(){
      let wsd_arr = this.weekStartDate.split('/');
      let wed_arr = this.weekEndDate.split('/');
       length = this.yearWeeks.length;
      let nextCount = this.yearWeeks.length;

      this.yearWeeks.forEach(item => {
                    let sd_arr =  item['week_start_date'].split('/');
                    let ed_arr = item['week_end_date'].split('/');
                    if ((wed_arr[0] == sd_arr[0]) && (wed_arr[1] == sd_arr[1])) {
                        if (nextCount == 1) {                            
                            var year = +parseInt(wsd_arr[2]) + +1;
                            let headers = new Headers();
                            headers.append("Content-Type","application/x-www-form-urlencoded");
                            let httpBody = "year="+this.yearStart;
                            var url = this.base_url + 'userServices/getYearWeek';
                            this.http.post(url, httpBody,{headers:headers})
                            .subscribe(
                              data => {
                                    let responseData = data["_body"];
                                    var obj = JSON.parse(responseData);
                                    this.yearWeeks = obj.yearWeeks;
                                    this.getNextWeek();
                                }, error => {
                                  console.log(error);
                                }
                          );
                        }
                        this.weekID = item['idWeek'];
                        this.weekStartDate = item['week_start_date'];
                        this.weekEndDate = item['week_end_date'];
                    }
                    nextCount--;
              });
  }

  weeklyForm(userId){
  this.navCtrl.push(MyBuddyWeeklyPage,{
      weekStartDate:this.weekStartDate,
      weekEndDate:this.weekEndDate,
      weekID:this.weekID,
      userId:userId
    });
  }

  monthlyForm(userId){
  let selectedMonth = this.monthStart+1;
    this.navCtrl.push(MyBuddyMonthlyPage,{
      monthStart:selectedMonth,
      yearStart:this.yearStart,
      userId:userId
    });
  }

  add_buddy(){
    //console.log('Hello Add Buddies');
    this.navCtrl.push(AddBuddyPage);
  }

  ionViewWillEnter(){
    this.getBuddiesList(this.pageName);
  }


 getBuddiesList(pageName){
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

            if(this.version_name == obj.version_name){
               if(obj.response == 'F'){
                } else {

                  loading.dismiss();
                  this.Buddies_data = obj.data;
                  this.dataArr = this.Buddies_data;
                }
            }else{
                loading.dismiss();
                this.showErrorAlert();
                this.navCtrl.pop();
            }
          }, error => {
            console.log(error);
          }
    );
  }

   showErrorAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Notification',
      subTitle: 'Please update your app version.',
    });
    basicAlert.present();
  }

  removeBuddy(buddyId){ 
    
  if(buddyId != '' ){
        var url = this.base_url + 'userServices/removeBuddy';
      let headers = new Headers();
      headers.append("Content-Type","application/x-www-form-urlencoded");
      let httpBody = "access_token="+localStorage.getItem('auth_token')+"&version_name="+localStorage.getItem('version_name')+"&buddy_user_id="+buddyId;
      this.http.post(url, httpBody,{headers:headers})
        .subscribe(
          data => {
             let responseData = data["_body"];
             var obj = JSON.parse(responseData);
              if(obj.response == 'S'){
                this.getBuddiesList(this.pageName);  
              }else{
                this.presentAlert();
              }
              
            }, error => {
              console.log(error);
            }
      );  
    }
    
  }

  removeBuddyAlert(buddyId) {
  const confirm = this.alertCtrl.create({
    title: 'Remove buddy',
    message: 'Are you sure , you want to remove?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          // do nothing, user tapped cancel
        }
      },
      {
        text: 'Remove',
        handler: () => {
          this.removeBuddy(buddyId);
        }
      }
    ]
  });
  confirm.present();
}

   presentAlert() {
    const confirm = this.alertCtrl.create({
    title: 'Error',
    message: 'Something went wrong, Please try again later',
    buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          // do nothing, user tapped cancel
        }
      }
    ]
  });
  confirm.present();
  }

}
