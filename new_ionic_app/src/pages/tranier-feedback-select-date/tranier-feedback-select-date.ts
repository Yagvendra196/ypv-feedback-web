import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Constants from '../../app/constants';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { TranierFeedbackPage } from '../../pages/tranier-feedback/tranier-feedback';

/**
 * Generated class for the TranierFeedbabackSelectDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tranier-feedback-select-date',
  templateUrl: 'tranier-feedback-select-date.html',
})
export class TranierFeedbackSelectDatePage {

  monthNames:string[];
  yearStart:number;
  monthStart:number;
  monthStartinWords:string;
  base_url:string;
  month:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.base_url = Constants.wsBaseUrl;
    this.monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    this.yearStart = (new Date()).getFullYear();
    this.monthStart = (new Date()).getMonth();
    this.monthStartinWords = this.monthNames[ this.monthStart ];

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranierFeedbabackSelectDatePage');
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

  trainerFeedbackForm(){
     let selectMonth = this.monthStart + 1;
     this.navCtrl.push(TranierFeedbackPage,{
      FinalmonthStart:selectMonth,
      yearStart:this.yearStart
    });
    
  }

}
