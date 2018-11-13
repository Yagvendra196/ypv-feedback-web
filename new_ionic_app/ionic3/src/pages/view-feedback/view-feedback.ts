import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Constants from '../../app/constants';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ViewFeedbackFormPage } from '../../pages/view-feedback-form/view-feedback-form';
import { ViewFeedbackFormMonthlyPage } from '../../pages/view-feedback-form-monthly/view-feedback-form-monthly';



/**
 * Generated class for the ViewFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-view-feedback',
  templateUrl: 'view-feedback.html',
})
export class ViewFeedbackPage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

  	this.base_url = Constants.wsBaseUrl;
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
  	this.dataArr = this.navParams.get('buddiesArr');
  	//console.log('ionViewDidLoad ViewFeedbackPage');
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

  weeklyForm(sp_userid){
    this.navCtrl.push(ViewFeedbackFormPage,{
      sp_userid:sp_userid,
      idWeek:this.weekID
    });
  }
  monthlyForm(sp_userid){
    let selected_month = this.monthStart + 1;
    let selected_date = this.yearStart+'-'+ selected_month +'-01 00:00:00';

   this.navCtrl.push(ViewFeedbackFormMonthlyPage,{
      sp_userid:sp_userid,
      selected_date:selected_date
    }); 
  }

}
