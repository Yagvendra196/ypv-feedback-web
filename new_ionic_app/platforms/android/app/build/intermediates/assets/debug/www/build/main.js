webpackJsonp([17],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddBuddyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_constants__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the AddBuddyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddBuddyPage = /** @class */ (function () {
    function AddBuddyPage(navCtrl, navParams, formBuilder, http, loadingCtrl, menu, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.searchForm = formBuilder.group({
            keywords: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
        this.device_id = __WEBPACK_IMPORTED_MODULE_7__app_constants__["a" /* device_id */];
        this.role_id = __WEBPACK_IMPORTED_MODULE_7__app_constants__["b" /* role_id */];
        this.base_url = __WEBPACK_IMPORTED_MODULE_7__app_constants__["d" /* wsBaseUrl */];
        this.version_name = __WEBPACK_IMPORTED_MODULE_7__app_constants__["c" /* versionName */];
    }
    AddBuddyPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    AddBuddyPage.prototype.addBuddyFunction = function (userId) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var url = this.base_url + 'userServices/setAddBuddies';
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var httpBody = "access_token=" + localStorage.getItem('auth_token') + "&user_id=" + userId;
        //console.log(httpBody);
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            if (obj.response == 'S') {
                loading.dismiss();
                _this.showSuccessAlert();
                _this.getData();
            }
            else {
                _this.showErrorAlert();
            }
        }, function (error) {
            console.log(error);
        });
    };
    AddBuddyPage.prototype.showSuccessAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Buddy Add Successfully.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    AddBuddyPage.prototype.showErrorAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Error in network, Please try again later!.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    AddBuddyPage.prototype.searchBuddy = function () {
        var _this = this;
        //console.log();
        var keyword = this.searchForm.value.keywords;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var url = this.base_url + 'userServices/searchBuddy';
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var httpBody = "access_token=" + localStorage.getItem('auth_token') + "&keywords=" + keyword;
        //console.log(httpBody);
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            if (obj.response == 'S') {
                loading.dismiss();
                _this.addBuddy = obj.data;
                console.log(_this.addBuddy);
            }
            else {
                _this.showErrorAlert();
            }
        }, function (error) {
            console.log(error);
        });
    };
    AddBuddyPage.prototype.filterBuddy = function () {
        console.log(this.searchForm.value.keywords);
        if (this.searchForm.value.keywords == '') {
            this.getData();
        }
    };
    AddBuddyPage.prototype.getData = function () {
        var _this = this;
        var url = this.base_url + 'userServices/getAddBuddies';
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var httpBody = "access_token=" + localStorage.getItem('auth_token');
        //console.log(httpBody);
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            if (obj.response == 'S') {
                _this.addBuddy = obj.data;
                _this.dataFound = true;
            }
            else {
                _this.dataFound = false;
            }
        }, function (error) {
            console.log(error);
        });
    };
    AddBuddyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-buddy',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/add-buddy/add-buddy.html"*/'<!--\n  Generated template for the AddBuddyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title><small style="font-size: 18px;">Add Buddies</small></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n		<div class="clearfix"></div>\n			<!-- <div slimScroll width="auto" height="550px"  size="7px"> -->\n				<ion-scroll width="auto" scrollY style="height:600px;width: auto;">\n	            <div class="item item-input-inset" >\n	                <form class="search_form" [formGroup]="searchForm">\n	                <label class="item-input-wrapper">\n	                  <input type="text" placeholder="Search" (keyup)="filterBuddy()" formControlName="keywords"> \n	                </label>\n	                <button (click)="searchBuddy()" class="search_btn"> <i class="icon ion-search"></i></button>\n	                </form>\n	            </div>\n\n	            <div class="list list1" *ngIf="addBuddy != \'\'" style="padding-top:0px;">\n\n	                <div *ngFor="let buddy of addBuddy" class="item item-thumbnail-left" id="buddy_user_id_{{ buddy.user_id }}"> \n	                    <img *ngIf="buddy.gender == \'M\'" src=\'assets/imgs/default-male.png\'>\n	                    <img *ngIf="buddy.gender == \'F\'" src=\'assets/imgs/default-female.png\'>\n	                    <h2><a href="#/app/addBuddy">{{buddy.first_name}} {{buddy.last_name}}</a></h2>\n	                    <p *ngIf="buddy.city != \'\' && buddy.state != \'\'"><img src="assets/imgs/map-pin.png" width="10px">{{buddy.city}} {{buddy.state}}</p>\n	                    <a  (click)="addBuddyFunction(buddy.user_id)" class="btn-small">Add </a> \n	                </div>\n	            </div>\n\n		        <div class="list list1" *ngIf="addBuddy == \'\'">\n		            <div class="no-box">  <img src=\'assets/imgs/icon-no-comment.png\'><div class="clearfix"> </div>\n		            <h3 class="text-center">No buddy found.</h3>\n		             </div>\n		        </div>\n            <!-- </div> -->\n            </ion-scroll>\n\n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/add-buddy/add-buddy.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], AddBuddyPage);
    return AddBuddyPage;
}());

//# sourceMappingURL=add-buddy.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ForgotPasswordPage = /** @class */ (function () {
    function ForgotPasswordPage(platform, navCtrl, navParams, formBuilder, http, loadingCtrl, menu, alertCtrl) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.forgotPwdForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.device_id = __WEBPACK_IMPORTED_MODULE_7__app_constants__["a" /* device_id */];
        this.role_id = __WEBPACK_IMPORTED_MODULE_7__app_constants__["b" /* role_id */];
        this.base_url = __WEBPACK_IMPORTED_MODULE_7__app_constants__["d" /* wsBaseUrl */];
        this.version_name = __WEBPACK_IMPORTED_MODULE_7__app_constants__["c" /* versionName */];
        if (platform.is('android')) {
            this.device_type = 'android';
        }
        if (platform.is('ios')) {
            this.device_type = 'ios';
        }
    }
    ForgotPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgotPasswordPage');
    };
    ForgotPasswordPage.prototype.doForgotPwd = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var email_id = this.forgotPwdForm.value.email;
        var url = this.base_url + 'userServices/forgot_password';
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var httpBody = "email=" + email_id;
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            if (obj.response == 'S') {
                _this.forgotPwdForm.reset();
                loading.dismiss();
                _this.showSuccessAlert();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */]);
            }
            else {
                _this.showErrorAlert();
            }
        }, function (error) {
            console.log(error);
        });
    };
    ForgotPasswordPage.prototype.showSuccessAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Email Sent Successfully.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    ForgotPasswordPage.prototype.showErrorAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Error in network, Please try again later!.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    ForgotPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-forgot-password',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/forgot-password/forgot-password.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-buttons>\n    <ion-title><small style="font-size: 18px;">Forgot Password</small></ion-title> \n  </ion-navbar>\n</ion-header>\n \n<ion-content padding>\n        <form class="list form1" name="forgotPwdForm" [formGroup]="forgotPwdForm" novalidate="" (ngSubmit)="doForgotPwd()">\n                    <div class="list">\n\n                    	<label class="item item-input item-stacked-label"> <span ng-class="forgotForm.username.$touched && (forgotForm.username.$error.required || forgotForm.username.$error.email || forgotForm.username.$error.minlength || forgotForm.username.$error.maxlength) ? \'input-label has-error\' : \'input-label\'">Email</span>\n\n                            <input type="email" placeholder="" formControlName="email" ng-minlength="5" ng-maxlength="11" required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                        </label>\n\n                        <div class="success-msg">{{ flash_success }}</div>\n                        <div class="has-error">{{ flash_failure }} </div>\n                    </div>\n\n                    <button [disabled]="!forgotPwdForm.valid" type="submit" class="button button-stable  button-block btn-login">Forgot Password</button>\n        </form>\n\n\n</ion-content>'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/forgot-password/forgot-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyBuddyWeeklyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_constants__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the MyBuddyWeeklyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyBuddyWeeklyPage = /** @class */ (function () {
    function MyBuddyWeeklyPage(navCtrl, navParams, formBuilder, http, loadingCtrl, menu, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.WeeklyForm = formBuilder.group({
            feedback_field_1: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            feedback_field_2: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            feedback_field_3: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            feedback_field_4: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            feedback_field_5: ['', ''],
            feedback_field_6: ['', ''],
            feedback_field_7: ['', ''],
            feedback_field_8: ['', ''],
            feedback_field_9: ['', ''],
            feedback_field_10: ['', ''],
            feedback_field_11: ['', ''],
            feedback_field_12: ['', ''],
            feedback_field_13: ['', ''],
            feedback_field_14: ['', ''],
            feedback_field_15: ['', ''],
            feedback_field_16: ['', ''],
            feedback_field_17: ['', ''],
            feedback_field_18: ['', ''],
            feedback_field_19: ['', ''],
            feedback_field_20: ['', ''],
            feedback_field_21: ['', ''],
            feedback_field_22: ['', ''],
            feedback_field_23: ['', ''],
            feedback_field_24: ['', ''],
            feedback_field_25: ['', ''],
            feedback_field_26: ['', ''],
            feedback_field_27: ['', ''],
            feedback_field_28: ['', ''],
            feedback_field_29: ['', ''],
            feedback_field_30: ['', ''],
            feedback_field_31: ['', ''],
            feedback_field_32: ['', ''],
            feedback_field_33: ['', ''],
            feedback_field_34: ['', ''],
            feedback_field_35: ['', '']
        });
        this.device_id = __WEBPACK_IMPORTED_MODULE_7__app_constants__["a" /* device_id */];
        this.role_id = __WEBPACK_IMPORTED_MODULE_7__app_constants__["b" /* role_id */];
        this.base_url = __WEBPACK_IMPORTED_MODULE_7__app_constants__["d" /* wsBaseUrl */];
        this.version_name = __WEBPACK_IMPORTED_MODULE_7__app_constants__["c" /* versionName */];
        var url = this.base_url + 'userServices/feedback_fields';
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var feedback_type = 1;
        var httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&user_id=" + this.navParams.get('userId') + "";
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            _this.feedback_fields = obj.data;
            _this.feedback_fields_0 = obj.data[0].feedback_field_label;
            _this.feedback_fields_1 = obj.data[1].feedback_field_label;
            _this.feedback_fields_2 = obj.data[2].feedback_field_label;
            _this.feedback_fields_3 = obj.data[3].feedback_field_label;
            _this.feedback_fields_4 = obj.data[4].feedback_field_label;
            _this.feedback_fields_5 = obj.data[5].feedback_field_label;
            _this.feedback_fields_6 = obj.data[6].feedback_field_label;
            _this.feedback_fields_7 = obj.data[7].feedback_field_label;
            _this.feedback_fields_8 = obj.data[8].feedback_field_label;
            _this.feedback_fields_9 = obj.data[9].feedback_field_label;
            _this.feedback_fields_10 = obj.data[10].feedback_field_label;
            _this.feedback_fields_11 = obj.data[11].feedback_field_label;
            _this.feedback_fields_12 = obj.data[12].feedback_field_label;
            _this.feedback_fields_13 = obj.data[13].feedback_field_label;
            _this.feedback_fields_14 = obj.data[14].feedback_field_label;
            _this.feedback_fields_15 = obj.data[15].feedback_field_label;
            _this.feedback_fields_16 = obj.data[16].feedback_field_label;
            _this.feedback_fields_17 = obj.data[17].feedback_field_label;
            _this.feedback_fields_18 = obj.data[18].feedback_field_label;
            _this.feedback_fields_19 = obj.data[19].feedback_field_label;
            _this.feedback_fields_20 = obj.data[20].feedback_field_label;
            _this.feedback_fields_21 = obj.data[21].feedback_field_label;
            _this.feedback_fields_22 = obj.data[22].feedback_field_label;
            _this.feedback_fields_23 = obj.data[23].feedback_field_label;
            _this.feedback_fields_24 = obj.data[24].feedback_field_label;
            _this.feedback_fields_25 = obj.data[25].feedback_field_label;
            _this.feedback_fields_26 = obj.data[26].feedback_field_label;
            _this.feedback_fields_27 = obj.data[27].feedback_field_label;
            _this.feedback_fields_28 = obj.data[28].feedback_field_label;
            _this.feedback_fields_29 = obj.data[29].feedback_field_label;
            _this.feedback_fields_30 = obj.data[30].feedback_field_label;
            _this.feedback_fields_31 = obj.data[31].feedback_field_label;
            _this.feedback_fields_32 = obj.data[32].feedback_field_label;
            _this.feedback_fields_33 = obj.data[33].feedback_field_label;
            _this.feedback_fields_34 = obj.data[34].feedback_field_label;
            // CALL view_feedback_fields
            var feedback_type1 = 'Weekly';
            var purpose = 'edit';
            var use_date_filter = 1;
            var url1 = _this.base_url + 'userServices/view_feedback_fields';
            var httpBody1 = "feedback_type=" + feedback_type1 + "&access_token=" + localStorage.getItem('auth_token') + "&spiritual_buddie_user_id=" + _this.navParams.get('userId') + "&idWeek=" + _this.navParams.get('weekID') + "&purpose=" + purpose + "&use_date_filter=" + use_date_filter;
            _this.http.post(url1, httpBody1, {
                headers: headers
            })
                .subscribe(function (data) {
                var responseData1 = data["_body"];
                var objViewFeedback = JSON.parse(responseData1);
                console.log(objViewFeedback);
                if (objViewFeedback.response == 'S') {
                    _this.feedback_field_id_1 = objViewFeedback.data[0].user_feedback_field_value;
                    _this.feedback_field_id_2 = objViewFeedback.data[1].user_feedback_field_value;
                    _this.feedback_field_id_3 = (objViewFeedback.data[2].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[2].user_feedback_field_value;
                    _this.feedback_field_id_4 = (objViewFeedback.data[3].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[3].user_feedback_field_value;
                    _this.feedback_field_id_5 = (objViewFeedback.data[4].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[4].user_feedback_field_value;
                    _this.feedback_field_id_6 = (objViewFeedback.data[5].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[5].user_feedback_field_value;
                    _this.feedback_field_id_7 = (objViewFeedback.data[6].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[6].user_feedback_field_value;
                    _this.feedback_field_id_8 = (objViewFeedback.data[7].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[7].user_feedback_field_value;
                    _this.feedback_field_id_9 = (objViewFeedback.data[8].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[8].user_feedback_field_value;
                    _this.feedback_field_id_10 = (objViewFeedback.data[9].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[9].user_feedback_field_value;
                    _this.feedback_field_id_11 = (objViewFeedback.data[10].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[10].user_feedback_field_value;
                    _this.feedback_field_id_12 = (objViewFeedback.data[11].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[11].user_feedback_field_value;
                    _this.feedback_field_id_13 = (objViewFeedback.data[12].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[11].user_feedback_field_value;
                    _this.feedback_field_id_14 = (objViewFeedback.data[13].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[13].user_feedback_field_value;
                    _this.feedback_field_id_15 = (objViewFeedback.data[14].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[14].user_feedback_field_value;
                    _this.feedback_field_id_16 = (objViewFeedback.data[15].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[15].user_feedback_field_value;
                    _this.feedback_field_id_17 = (objViewFeedback.data[16].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[16].user_feedback_field_value;
                    _this.feedback_field_id_18 = (objViewFeedback.data[17].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[17].user_feedback_field_value;
                    _this.feedback_field_id_19 = (objViewFeedback.data[18].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[18].user_feedback_field_value;
                    _this.feedback_field_id_20 = (objViewFeedback.data[19].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[19].user_feedback_field_value;
                    _this.feedback_field_id_21 = (objViewFeedback.data[20].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[20].user_feedback_field_value;
                    _this.feedback_field_id_22 = (objViewFeedback.data[21].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[21].user_feedback_field_value;
                    _this.feedback_field_id_23 = (objViewFeedback.data[22].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[22].user_feedback_field_value;
                    _this.feedback_field_id_24 = (objViewFeedback.data[23].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[23].user_feedback_field_value;
                    _this.feedback_field_id_25 = (objViewFeedback.data[24].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[24].user_feedback_field_value;
                    _this.feedback_field_id_26 = (objViewFeedback.data[25].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[25].user_feedback_field_value;
                    _this.feedback_field_id_27 = (objViewFeedback.data[26].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[26].user_feedback_field_value;
                    _this.feedback_field_id_28 = (objViewFeedback.data[27].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[27].user_feedback_field_value;
                    _this.feedback_field_id_29 = (objViewFeedback.data[28].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[28].user_feedback_field_value;
                    _this.feedback_field_id_30 = (objViewFeedback.data[31].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[31].user_feedback_field_value;
                    _this.feedback_field_id_31 = (objViewFeedback.data[30].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[30].user_feedback_field_value;
                    _this.feedback_field_id_32 = (objViewFeedback.data[31].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[31].user_feedback_field_value;
                    _this.feedback_field_id_33 = (objViewFeedback.data[32].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[32].user_feedback_field_value;
                    _this.feedback_field_id_34 = (objViewFeedback.data[33].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[33].user_feedback_field_value;
                    _this.feedback_field_id_35 = (objViewFeedback.data[34].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[34].user_feedback_field_value;
                }
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            console.log(error);
        });
    }
    MyBuddyWeeklyPage.prototype.ionViewDidLoad = function () {
        this.weekStartDate = this.navParams.get('weekStartDate');
        this.weekEndDate = this.navParams.get('weekEndDate');
        this.weekID = this.navParams.get('weekID');
        this.access_token = localStorage.getItem('auth_token');
        this.userId = this.navParams.get('userId');
    };
    MyBuddyWeeklyPage.prototype.feedbackWeeklySubmitFunction = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var httpBody2 = "feedback_field_1=" + this.WeeklyForm.value.feedback_field_1 + "&feedback_field_2=" + encodeURIComponent(this.WeeklyForm.value.feedback_field_2) + "&feedback_field_3=" + this.WeeklyForm.value.feedback_field_3 + "&feedback_field_4=" + this.WeeklyForm.value.feedback_field_4 + "&feedback_field_5=" + this.WeeklyForm.value.feedback_field_5 + "&feedback_field_6=" + this.WeeklyForm.value.feedback_field_6 + "&feedback_field_7=" + this.WeeklyForm.value.feedback_field_7 + "&feedback_field_8=" + this.WeeklyForm.value.feedback_field_8 + "&feedback_field_9=" + this.WeeklyForm.value.feedback_field_9 + "&feedback_field_10=" + this.WeeklyForm.value.feedback_field_10 + "&feedback_field_11=" + this.WeeklyForm.value.feedback_field_11 + "&feedback_field_12=" + this.WeeklyForm.value.feedback_field_12 + "&feedback_field_13=" + this.WeeklyForm.value.feedback_field_13 + "&feedback_field_14=" + this.WeeklyForm.value.feedback_field_14 + "&feedback_field_15=" + this.WeeklyForm.value.feedback_field_15 + "&feedback_field_16=" + this.WeeklyForm.value.feedback_field_16 + "&feedback_field_17=" + this.WeeklyForm.value.feedback_field_17 + "&feedback_field_18=" + this.WeeklyForm.value.feedback_field_18 + "&feedback_field_19=" + this.WeeklyForm.value.feedback_field_19 + "&feedback_field_20=" + this.WeeklyForm.value.feedback_field_20 + "&feedback_field_21=" + this.WeeklyForm.value.feedback_field_21 + "&feedback_field_22=" + this.WeeklyForm.value.feedback_field_22 + "&feedback_field_23=" + this.WeeklyForm.value.feedback_field_23 + "&feedback_field_24=" + this.WeeklyForm.value.feedback_field_24 + "&feedback_field_25=" + this.WeeklyForm.value.feedback_field_25 + "&feedback_field_26=" + this.WeeklyForm.value.feedback_field_26 + "&feedback_field_27=" + this.WeeklyForm.value.feedback_field_27 + "&feedback_field_28=" + this.WeeklyForm.value.feedback_field_28 + "&feedback_field_29=" + this.WeeklyForm.value.feedback_field_29 + "&feedback_field_30=" + this.WeeklyForm.value.feedback_field_30 + "&feedback_field_31=" + this.WeeklyForm.value.feedback_field_31 + "&feedback_field_32=" + this.WeeklyForm.value.feedback_field_32 + "&feedback_field_33=" + this.WeeklyForm.value.feedback_field_33 + "&feedback_field_34=" + this.WeeklyForm.value.feedback_field_34 + "&feedback_field_35=" + this.WeeklyForm.value.feedback_field_35 + "&user_id=" + this.userId + "&idWeek=" + this.weekID + "&access_token=" + localStorage.getItem('auth_token') + "&feedback_type=Weekly";
        // console.log(httpBody2);
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var url2 = this.base_url + 'userServices/feedbackWeekly';
        this.http.post(url2, httpBody2, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData2 = data["_body"];
            var obj = JSON.parse(responseData2);
            if (obj.response == 'S') {
                loading.dismiss();
                _this.showSuccessAlert();
                _this.navCtrl.pop();
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
            }
            else {
                _this.showErrorAlert();
            }
        }, function (error) {
            console.log(error);
        });
    };
    MyBuddyWeeklyPage.prototype.showSuccessAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Your Feedback is successfully submitted.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    MyBuddyWeeklyPage.prototype.showErrorAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Error in network, Please try again later!.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    MyBuddyWeeklyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-my-buddy-weekly',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/my-buddy-weekly/my-buddy-weekly.html"*/'<!--\n  Generated template for the MyBuddyWeeklyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title><small style="font-size: 18px;">Weekly Feedback</small></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="has-header has-header-inner1" >\n	<ion-scroll width="auto" scrollY style="height:600px;width: auto;">\n		<form  [formGroup]="WeeklyForm" class="list login-form form1" (ngSubmit)="feedbackWeeklySubmitFunction()"> \n                <input name="user_id" value="" type="hidden" />\n                <input name="idWeek" value="" type="hidden" value="{{weekID}}" />\n                <input name="feedback_type" value="" type="hidden" value="Weekly" />\n                <input name="access_token" value="" type="hidden" value="{{access_token}}"/>\n                <input name="user_Id" value="" type="hidden" value="{{userId}}"/>\n                 <div class="list" >\n\n                 	\n					<div>\n		       			<label  class="item item-input label-marb0" > \n			            <span class="input-label" style="white-space:pre-wrap;">{{feedback_fields_0}}</span>\n			           </label>\n			           <span class="item-select select-marb">\n			                        <select [(ngModel)]="feedback_field_id_1" formControlName="feedback_field_1" id="feedback_field_1" required >\n			                            <option value="Prep">Prep</option>\n			                            <option value="Level 1,2">Level 1,2</option>\n			                            <option value="Level 3">Level 3</option>\n			                            <option value="Level 3.1, 3.2">Level 3.1, 3.2</option>\n			                        </select>\n			           </span>\n		           </div>\n\n		           <div>\n		       			<label  class="item item-input label-marb0" > \n			            <span class="input-label" style="white-space:pre-wrap;">{{feedback_fields_1}}</span>\n			           </label>\n			           <span class="item-select select-marb">\n			                        <select [(ngModel)]="feedback_field_id_2" formControlName="feedback_field_2" id="feedback_field_2" required ng-model="feedbackWeeklyFormData.feedback_field_2">\n				                        <option value="Loving Kindness & Non-injury">Loving Kindness & Non-injury</option>\n				                        <option value="Moderation & Non-excessiveness">Moderation & Non-excessiveness</option>\n				                        <option value="Generosity & Non-Stealing">Generosity & Non-Stealing</option>\n				                        <option value="Constancy of Aim & effort & Non-Laziness">Constancy of Aim & effort & Non-laziness</option>\n				                        <option value="Accurate Perception & Correct Expression & Non-lying">Accurate Perception & Correct Expression & Non-lying</option>\n				                    </select>\n			           </span>\n		           </div>\n\n\n		           <div class="row form-stacked-row">\n			           <div class="col legend-box">\n			                 <span class="legend-box-heading">{{ feedback_fields_2}}</span>\n			             <div class="row form-stacked-row">\n\n			                      <div class="col col-50">\n			                          <div id="">\n			                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_2 }}</span>\n			                                <input type="text" class="" id="feedback_field_3" formControlName="feedback_field_3"  ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_3">\n			                              </label>\n			                          </div>\n			                      </div>\n\n			                      <div class="col col-50">\n			                        <div id="">\n			                           <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_3 }}</span>\n			                            <input type="text" class="" id="feedback_field_4" formControlName="feedback_field_4" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_4" >\n			                          </label>\n			                        </div>\n			                      </div>\n			           	 </div>\n			          </div>\n       				</div>\n\n       				 <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_4 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_5" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_5">\n	                    </label>\n	                </div>\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_5 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_6" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_6" >\n	                    </label>\n	                </div>\n\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_6 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_7" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_7">\n	                    </label>\n	                </div>\n\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_7 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_8" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_8">\n	                    </label>\n	                </div>\n\n\n	                 <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_8 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_9" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_9">\n	                    </label>\n	                </div>\n\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_9 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_10" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_10">\n	                    </label>\n	                </div>\n\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_10 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_11" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_11">\n	                    </label>\n	                </div>\n\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_11 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_12" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_12" >\n	                    </label>\n	                </div>\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_12 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_13" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_13">\n	                    </label>\n	                </div>\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_13 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_14" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_14">\n	                    </label>\n	                </div>\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_14 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_15" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_15">\n	                    </label>\n	                </div>\n\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_15 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_16" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_16">\n	                    </label>\n	                </div>\n               \n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_16 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_17" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_17">\n	                    </label>\n	                </div>\n\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_17 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_18" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_18">\n	                    </label>\n	                </div>\n\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_18 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_19" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_19">\n	                    </label>\n	                </div>\n\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_19 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_20" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_20">\n	                    </label>\n	                </div>\n\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_20 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_21" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_21">\n	                    </label>\n	                </div>\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_21 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_22" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_22">\n	                    </label>\n	                </div>\n\n	                <div class="row form-stacked-row">\n			           <div class="col legend-box">\n			                 <span class="legend-box-heading"> {{ feedback_fields_22 }}</span>\n			             <div class="row form-stacked-row">\n			                      <div class="col col-50">\n			                          <div id="">\n			                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_22 }}</span>\n			                                  <input type="text" class="" id="feedback_field_22" formControlName="feedback_field_23" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_23">\n			                              </label>\n			                          </div>\n			                      </div>\n\n			                      <div class="col col-50">\n			                        <div id="">\n			                           <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_23 }}</span>\n			                             <input type="text" class="" id="feedback_field_23" formControlName="feedback_field_24" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_24">\n			                          </label>\n			                        </div>\n			                           </div>\n			             </div>\n\n			             <div class="row form-stacked-row">\n								  <div class="col col-50">\n			                          <div id="">\n			                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_24 }}</span>\n			                                 <input type="text" class="" id="feedback_field_25" formControlName="feedback_field_25"  ng-model="feedbackWeeklyFormData.feedback_field_25" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_25">\n			                              </label>\n			                          </div>\n			                      </div>\n\n			                      <div class="col col-50">\n			                        <div id="">\n			                           <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">  </span>\n			                             \n			                          </label>\n			                        </div>\n			                      </div>\n						</div>\n\n			             <div class="row form-stacked-row">\n			                      <div class="col">\n			                        <div id="">\n			                           <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_25 }}</span>\n			                             <input type="text" class="" id="feedback_field_26" formControlName="feedback_field_26" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_26">\n			                          </label>\n			                        </div>\n			                           </div>\n			              </div>\n\n			             <div class="row form-stacked-row">\n\n			                      <div class="col ">\n			                          <div id="">\n			                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_26 }}  </span>\n			                                  <input type="text" class="" id="feedback_field_27" formControlName="feedback_field_27"  ng-model="feedbackWeeklyFormData.feedback_field_27" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_27">\n			                              </label>\n			                          </div>\n			                      </div>\n			             </div>\n			          </div>\n			        </div>\n\n			        <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_27 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_28" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_28">\n	                    </label>\n	                </div>\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_28 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_29" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_29">\n	                    </label>\n	                </div>\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_29 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_30" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_30">\n	                    </label>\n	                </div>\n\n	                 <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_30 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_31" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_31">\n	                    </label>\n	                </div>\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_31 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_32" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_32">\n	                    </label>\n	                </div>\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_32 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_33" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_33">\n	                    </label>\n	                </div>\n\n	                <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_33 }}</span>\n                                        <input type="text" id="" formControlName="feedback_field_34" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" [(ngModel)]="feedback_field_id_34">\n	                    </label>\n	                </div>\n\n	                \n\n	                 <div id="">\n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{ feedback_fields_34 }}</span>\n                                         <textarea class="" rows="8" cols="10" id="feedback_field_34" formControlName="feedback_field_35" ng-model="feedbackWeeklyFormData.feedback_field_34" [(ngModel)]="feedback_field_id_35" ></textarea>\n	                    </label>\n	                </div>\n\n                <div class="has-error"> </div>\n            </div> \n             \n            <button [disabled]="!WeeklyForm.valid"  type="submit" class="button button-stable button-block btn-login">SAVE</button>\n	</form>\n</ion-scroll>\n\n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/my-buddy-weekly/my-buddy-weekly.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyBuddyWeeklyPage);
    return MyBuddyWeeklyPage;
}());

//# sourceMappingURL=my-buddy-weekly.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyBuddyMonthlyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_constants__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the MyBuddyMonthlyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyBuddyMonthlyPage = /** @class */ (function () {
    function MyBuddyMonthlyPage(navCtrl, navParams, formBuilder, http, loadingCtrl, menu, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.MonthlyForm = formBuilder.group({
            feedback_field_51: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            feedback_field_52: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            feedback_field_53: ['', ''],
            feedback_field_54: ['', ''],
            feedback_field_55: ['', ''],
            feedback_field_56: ['', ''],
        });
        this.device_id = __WEBPACK_IMPORTED_MODULE_7__app_constants__["a" /* device_id */];
        this.role_id = __WEBPACK_IMPORTED_MODULE_7__app_constants__["b" /* role_id */];
        this.base_url = __WEBPACK_IMPORTED_MODULE_7__app_constants__["d" /* wsBaseUrl */];
        this.version_name = __WEBPACK_IMPORTED_MODULE_7__app_constants__["c" /* versionName */];
        this.monthStart = this.navParams.get('monthStart');
        this.yearStart = this.navParams.get('yearStart');
        this.selected_date = this.yearStart + '-' + this.monthStart + '-01 00:00:00';
        var url = this.base_url + 'userServices/feedback_fields';
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var feedback_type = 2;
        var httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&user_id=" + this.navParams.get('userId') + "";
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            _this.feedback_fields = obj.data;
            // this.feedback_fields_51 = obj.data[0].feedback_field_label;
            // this.feedback_fields_52 = obj.data[1].feedback_field_label;
            // this.feedback_fields_53 = obj.data[2].feedback_field_label;
            // this.feedback_fields_54 = obj.data[3].feedback_field_label;
            // this.feedback_fields_55 = obj.data[4].feedback_field_label;
            // this.feedback_fields_56 = obj.data[5].feedback_field_label;
            _this.feedback_fields_51 = (obj.data[0].feedback_field_label == 'undefined') ? '' : obj.data[0].feedback_field_label;
            _this.feedback_fields_52 = (obj.data[1].feedback_field_label == 'undefined') ? '' : obj.data[1].feedback_field_label;
            _this.feedback_fields_53 = (obj.data[2].feedback_field_label == 'undefined') ? '' : obj.data[2].feedback_field_label;
            _this.feedback_fields_54 = (obj.data[3].feedback_field_label == 'undefined') ? '' : obj.data[3].feedback_field_label;
            _this.feedback_fields_55 = (obj.data[4].feedback_field_label == 'undefined') ? '' : obj.data[4].feedback_field_label;
            _this.feedback_fields_55 = (obj.data[5].feedback_field_label == 'undefined') ? '' : obj.data[5].feedback_field_label;
            // CALL view_feedback_fields
            var feedback_type1 = 'Monthly';
            var purpose = 'edit';
            var use_date_filter = 1;
            var url1 = _this.base_url + 'userServices/view_feedback_fields';
            var httpBody1 = "feedback_type=" + feedback_type1 + "&access_token=" + localStorage.getItem('auth_token') + "&spiritual_buddie_user_id=" + _this.navParams.get('userId') + "&selected_date=" + _this.selected_date + "&purpose=" + purpose + "&use_date_filter=" + use_date_filter;
            _this.http.post(url1, httpBody1, {
                headers: headers
            })
                .subscribe(function (data) {
                var responseData1 = data["_body"];
                var objViewFeedback = JSON.parse(responseData1);
                console.log(objViewFeedback);
                if (objViewFeedback.response == 'S') {
                    _this.feedback_field_id_1 = (objViewFeedback.data[0].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[0].user_feedback_field_value;
                    _this.feedback_field_id_2 = (objViewFeedback.data[1].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[1].user_feedback_field_value;
                    _this.feedback_field_id_3 = (objViewFeedback.data[2].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[2].user_feedback_field_value;
                    _this.feedback_field_id_4 = (objViewFeedback.data[3].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[3].user_feedback_field_value;
                    _this.feedback_field_id_5 = (objViewFeedback.data[4].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[4].user_feedback_field_value;
                    _this.feedback_field_id_6 = (objViewFeedback.data[5].user_feedback_field_value == 'undefined') ? '' : objViewFeedback.data[5].user_feedback_field_value;
                    // this.feedback_field_id_1 = objViewFeedback.data[0].user_feedback_field_value;
                    // this.feedback_field_id_2 = objViewFeedback.data[1].user_feedback_field_value;
                    // this.feedback_field_id_3 = objViewFeedback.data[2].user_feedback_field_value;
                    // this.feedback_field_id_4 = objViewFeedback.data[3].user_feedback_field_value;
                    // this.feedback_field_id_5 = objViewFeedback.data[4].user_feedback_field_value;
                    // this.feedback_field_id_6 = objViewFeedback.data[5].user_feedback_field_value;
                }
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            console.log(error);
        });
    }
    MyBuddyMonthlyPage.prototype.ionViewDidLoad = function () {
        this.monthStart = this.navParams.get('monthStart');
        this.yearStart = this.navParams.get('yearStart');
        this.access_token = localStorage.getItem('auth_token');
        this.userId = this.navParams.get('userId');
        /*console.log(this.monthStart);
        console.log(this.yearStart);
        console.log('ionViewDidLoad MyBuddyMonthlyPage');*/
    };
    MyBuddyMonthlyPage.prototype.feedbackMonthlySubmitFunction = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.selected_date = this.yearStart + '-' + this.monthStart + '-01 00:00:00';
        var httpBody2 = "feedback_field_51=" + this.MonthlyForm.value.feedback_field_51 + "&feedback_field_52=" + this.MonthlyForm.value.feedback_field_52 + "&feedback_field_53=" + this.MonthlyForm.value.feedback_field_53 + "&feedback_field_54=" + this.MonthlyForm.value.feedback_field_54 + "&feedback_field_55=" + this.MonthlyForm.value.feedback_field_55 + "&feedback_field_56=" + this.MonthlyForm.value.feedback_field_56 + "&user_id=" + this.userId + "&selected_date=" + this.selected_date + "&access_token=" + localStorage.getItem('auth_token') + "&feedback_type=Monthly";
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var url2 = this.base_url + 'userServices/feedbackMonthly';
        this.http.post(url2, httpBody2, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData2 = data["_body"];
            var obj = JSON.parse(responseData2);
            if (obj.response == 'S') {
                loading.dismiss();
                _this.showSuccessAlert();
                _this.navCtrl.pop();
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
            }
            else {
                _this.showErrorAlert();
            }
        }, function (error) {
            console.log(error);
        });
    };
    MyBuddyMonthlyPage.prototype.showSuccessAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Your Feedback is successfully submitted.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    MyBuddyMonthlyPage.prototype.showErrorAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Error in network, Please try again later!.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    MyBuddyMonthlyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-my-buddy-monthly',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/my-buddy-monthly/my-buddy-monthly.html"*/'<!--\n  Generated template for the MyBuddyWeeklyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title><small style="font-size: 18px;">Monthly Feedback</small></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="has-header has-header-inner1" >\n	\n		<!-- <form slimScroll width="auto" height="550px"  size="7px" [formGroup]="WeeklyForm" class="list login-form form1" (ngSubmit)="feedbackWeeklySubmitFunction()">  -->\n\n	<!-- </form> -->\n	<ion-scroll width="auto" scrollY style="height:600px;width: auto;">\n		<form  class="list form1" [formGroup]="MonthlyForm" (ngSubmit)="feedbackMonthlySubmitFunction()">\n\n			<div class="list">\n	               \n			       <div class="row form-stacked-row">\n			           <div class="col legend-box">\n			                 <span class="legend-box-heading">Tigthing</span>\n\n			             <div class="row form-stacked-row">\n\n			                      <div class="col col-50">\n			                          <div >\n			                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;" >  {{feedback_fields_51}}   </span>\n			                        <input [(ngModel)]="feedback_field_id_1" formControlName="feedback_field_51" type="text" class="" name="feedback_field_51"  ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" > <span class="percent-symbol">%</span>\n			                              </label>\n			                          </div>\n			                      </div>\n\n			                      <div class="col col-50">\n			                        <div >\n			                           <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;" > {{feedback_fields_52}}  </span>\n			                        <input [(ngModel)]="feedback_field_id_2" type="text" class="" formControlName="feedback_field_52" ng-model="feedbackMonthlyFormData.feedback_field_52" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n			                          </label>\n			                        </div>\n			                           </div>\n			             </div>\n			             <div class="row form-stacked-row">\n			                  <div class="col ">\n			               <div >\n			                    <label  class="item item-input item-stacked-label" >\n			                    <span class="input-label" style="white-space:pre-wrap;" > {{feedback_fields_53}}</span>\n			                     <textarea [(ngModel)]="feedback_field_id_3" class="" rows="8" cols="10" id="feedback_field_53" formControlName="feedback_field_53" ng-model="feedbackMonthlyFormData.feedback_field_53" ></textarea>\n			                   </label>\n			                </div>\n			                  </div>\n			              </div>\n			          </div>\n			        </div>\n\n\n\n\n			       <div class="row form-stacked-row">\n			           <div class="col legend-box">\n			                 <span class="legend-box-heading">Services</span>\n\n			             <div class="row form-stacked-row">\n			                   <div >\n			                        <label  class="item item-input item-stacked-label" >\n			                        <span class="input-label" style="white-space:pre-wrap;" > {{feedback_fields_54}} </span>\n			                         <input [(ngModel)]="feedback_field_id_4" type="text" class="" formControlName="feedback_field_54" ng-model="feedbackMonthlyFormData.feedback_field_54" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n			                       </label>\n			                    </div>\n			             </div>\n\n			             <div class="row form-stacked-row">\n			                  <div >\n			                        <label  class="item item-input item-stacked-label" >\n			                        <span class="input-label" style="white-space:pre-wrap;" > {{feedback_fields_55}} </span>\n			                          <input [(ngModel)]="feedback_field_id_5" type="text" class="" formControlName="feedback_field_55" ng-model="feedbackMonthlyFormData.feedback_field_55" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n			                       </label>\n			                    </div>\n			             </div>\n			          </div>\n			        </div>\n\n		          <div class="row form-stacked-row">\n			           <div class="col legend-box">\n			                 <span class="legend-box-heading">Any other feedback</span>\n		           	    <label  class="item item-input item-stacked-label" >\n		                <span class="input-label" style="white-space:pre-wrap;" > {{feedback_fields_56}} </span>\n		                 <textarea [(ngModel)]="feedback_field_id_6" class="" rows="8" cols="10" id="feedback_field_56" formControlName="feedback_field_56" ng-model="feedbackMonthlyFormData.feedback_field_56" ></textarea>\n		               </label>\n		            </div>\n		        </div>\n\n\n	                <div class="has-error"> </div>\n\n	                <button [disabled]="!MonthlyForm.valid" type="submit" class="button button-stable button-block btn-login">SAVE</button>\n\n	               \n	            </div>\n	        </form>\n    </ion-scroll>\n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/my-buddy-monthly/my-buddy-monthly.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyBuddyMonthlyPage);
    return MyBuddyMonthlyPage;
}());

//# sourceMappingURL=my-buddy-monthly.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewFeedbackFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_constants__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the ViewFeedbackFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewFeedbackFormPage = /** @class */ (function () {
    function ViewFeedbackFormPage(navCtrl, navParams, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.base_url = __WEBPACK_IMPORTED_MODULE_6__app_constants__["d" /* wsBaseUrl */];
        console.log(this.navParams.get('sp_userid'));
        var url = this.base_url + 'userServices/view_feedback_fields';
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var feedback_type = 'Weekly';
        var purpose = 'view';
        var httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&spiritual_buddie_user_id=" + this.navParams.get('sp_userid') + "&purpose=" + purpose + "&use_date_filter=1" + "&idWeek=" + this.navParams.get('idWeek');
        console.log(httpBody);
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            console.log(obj);
            if (obj.response == 'S') {
                _this.label_1 = obj.data[0].feedback_field_label;
                _this.label_2 = obj.data[1].feedback_field_label;
                _this.label_3 = obj.data[2].feedback_field_label;
                _this.label_4 = obj.data[3].feedback_field_label;
                _this.label_5 = obj.data[4].feedback_field_label;
                _this.label_6 = obj.data[5].feedback_field_label;
                _this.label_7 = obj.data[6].feedback_field_label;
                _this.label_8 = obj.data[7].feedback_field_label;
                _this.label_9 = obj.data[8].feedback_field_label;
                _this.label_10 = obj.data[9].feedback_field_label;
                _this.label_11 = obj.data[10].feedback_field_label;
                _this.label_12 = obj.data[11].feedback_field_label;
                _this.label_13 = obj.data[12].feedback_field_label;
                _this.label_14 = obj.data[13].feedback_field_label;
                _this.label_15 = obj.data[14].feedback_field_label;
                _this.label_16 = obj.data[15].feedback_field_label;
                _this.label_17 = obj.data[16].feedback_field_label;
                _this.label_18 = obj.data[17].feedback_field_label;
                _this.label_19 = obj.data[18].feedback_field_label;
                _this.label_20 = obj.data[19].feedback_field_label;
                _this.label_21 = obj.data[20].feedback_field_label;
                _this.label_22 = obj.data[21].feedback_field_label;
                _this.label_23 = obj.data[22].feedback_field_label;
                _this.label_24 = obj.data[23].feedback_field_label;
                _this.label_25 = obj.data[24].feedback_field_label;
                _this.label_26 = obj.data[25].feedback_field_label;
                _this.label_27 = obj.data[26].feedback_field_label;
                _this.label_28 = obj.data[27].feedback_field_label;
                _this.label_29 = obj.data[28].feedback_field_label;
                _this.label_30 = obj.data[29].feedback_field_label;
                _this.label_31 = obj.data[30].feedback_field_label;
                _this.label_32 = obj.data[31].feedback_field_label;
                _this.label_33 = obj.data[32].feedback_field_label;
                _this.label_34 = obj.data[33].feedback_field_label;
                _this.label_35 = obj.data[34].feedback_field_label;
                _this.value_1 = obj.data[0].user_feedback_field_value;
                _this.value_2 = obj.data[1].user_feedback_field_value;
                _this.value_3 = obj.data[2].user_feedback_field_value;
                _this.value_4 = obj.data[3].user_feedback_field_value;
                _this.value_5 = obj.data[4].user_feedback_field_value;
                _this.value_6 = obj.data[5].user_feedback_field_value;
                _this.value_7 = obj.data[6].user_feedback_field_value;
                _this.value_8 = obj.data[7].user_feedback_field_value;
                _this.value_9 = obj.data[8].user_feedback_field_value;
                _this.value_10 = obj.data[9].user_feedback_field_value;
                _this.value_11 = obj.data[10].user_feedback_field_value;
                _this.value_12 = obj.data[11].user_feedback_field_value;
                _this.value_13 = obj.data[12].user_feedback_field_value;
                _this.value_14 = obj.data[13].user_feedback_field_value;
                _this.value_15 = obj.data[14].user_feedback_field_value;
                _this.value_16 = obj.data[15].user_feedback_field_value;
                _this.value_17 = obj.data[16].user_feedback_field_value;
                _this.value_18 = obj.data[17].user_feedback_field_value;
                _this.value_19 = obj.data[18].user_feedback_field_value;
                _this.value_20 = obj.data[19].user_feedback_field_value;
                _this.value_21 = obj.data[20].user_feedback_field_value;
                _this.value_22 = obj.data[21].user_feedback_field_value;
                _this.value_23 = obj.data[22].user_feedback_field_value;
                _this.value_24 = obj.data[23].user_feedback_field_value;
                _this.value_25 = obj.data[24].user_feedback_field_value;
                _this.value_26 = obj.data[25].user_feedback_field_value;
                _this.value_27 = obj.data[26].user_feedback_field_value;
                _this.value_28 = obj.data[27].user_feedback_field_value;
                _this.value_29 = obj.data[28].user_feedback_field_value;
                _this.value_30 = obj.data[29].user_feedback_field_value;
                _this.value_31 = obj.data[30].user_feedback_field_value;
                _this.value_32 = obj.data[31].user_feedback_field_value;
                _this.value_33 = obj.data[32].user_feedback_field_value;
                _this.value_34 = obj.data[33].user_feedback_field_value;
                _this.value_35 = obj.data[34].user_feedback_field_value;
                _this.dataFound = true;
            }
            else {
                _this.dataFound = false;
            }
        }, function (error) {
            console.log(error);
        });
    }
    ViewFeedbackFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViewFeedbackFormPage');
    };
    ViewFeedbackFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-view-feedback-form',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/view-feedback-form/view-feedback-form.html"*/'<!--\n  Generated template for the MyBuddyWeeklyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title><small style="font-size: 18px;">Weekly Feedback</small></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="has-header has-header-inner1" >\n	<!-- [formGroup]="WeeklyForm" -->\n	<ion-scroll width="auto" scrollY style="height:600px;width: auto;">\n		<form   class="list login-form form1"  *ngIf="dataFound === true"> \n                <div class="list">\n\n        \n\n          <div id=""  >\n\n                <!-- feedbackWeeklyForm.feedback_field_1.$error.required ? \'has-error\' : \'\' -->        \n           <label  class="item item-input item-stacked-label" > \n            <span class="input-label" style="white-space:pre-wrap;">{{label_1}}</span>\n                <input readonly="readonly" type="text" class="fview" id="feedback_field_1" name="feedback_field_1"  [(ngModel)]="value_1"  >\n           </label>\n          </div>\n\n\n\n          <div >\n               <label  class="item item-input item-stacked-label" > \n                <span class="input-label" style="white-space:pre-wrap;">{{label_2}}</span>\n                <input readonly="readonly" type="text" class="fview" id="feedback_field_2" name="feedback_field_2"  [(ngModel)]="value_2"  >\n               </label>\n            </div>\n\n\n\n       <div class="row form-stacked-row">\n           <div class="col legend-box">\n                 <span class="legend-box-heading"> </span>\n             <div class="row form-stacked-row">\n\n                      <div class="col col-50">\n                          <div>       <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_3}}</span>\n                                <input readonly="readonly" type="text" class="fview" id="feedback_field_3" name="feedback_field_3"  [(ngModel)]="value_3" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                              </label>\n                          </div>\n                      </div>\n\n                      <div class="col col-50">\n                        <div>    <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_4}}</span>\n                            <input readonly="readonly" type="text" class="fview" id="feedback_field_4" name="feedback_field_4"  [(ngModel)]="value_4" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                          </label>\n                        </div>\n                           </div>\n            </div>\n\n          </div>\n        </div>\n\n\n\n               <div>  \n                      <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_5}}</span>\n                                        <input readonly="readonly" class="fview" type="text" id="feedback_field_5" name="feedback_field_5"  [(ngModel)]="value_5" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                    </label>\n                </div>\n         \n         \n                        <div >\n                            <label class="item item-input item-stacked-label"> \n                            <span class="input-label" style="white-space:pre-wrap;">{{label_6}}</span>\n                <input readonly="readonly" type="text" class="fview" id="feedback_field_6" name="feedback_field_6"  [(ngModel)]="value_6" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />\n                          </label>\n                        </div>\n                         \n\n                        \n                           <div>      <label class="item item-input item-stacked-label"> \n                                  <span class="input-label" style="white-space:pre-wrap;"> {{label_7}}</span>\n                <input readonly="readonly" type="text" class="fview" id="feedback_field_7" name="feedback_field_7"  [(ngModel)]="value_7" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />\n                              </label>\n                          </div>\n                    \n                    \n                       <div *ngIf="value_8 != null" >    \n                        <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_8}}</span>\n                <input readonly="readonly" type="text" class="fview" id="feedback_field_8" name="feedback_field_8"  [(ngModel)]="value_8" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />\n                          </label>\n                        </div>\n                   \n\n\n            <div *ngIf="value_9 != null">\n                <label  class="item item-input item-stacked-label" > \n                <span class="input-label" style="white-space:pre-wrap;">{{label_9}}</span>\n                 <input readonly="readonly" type="text" class="fview" id="feedback_field_9" name="feedback_field_9"  [(ngModel)]="value_9" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"  >\n               </label>\n    \n            </div>\n       \n\n\n            <div *ngIf="value_9 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;"> {{label_10}}  </span>\n                 <input readonly="readonly" type="text" class="fview" id="feedback_field_10" name="feedback_field_10"  [(ngModel)]="value_10" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n               </label>\n            \n                   \n                \n            </div>\n      \n\n       <div *ngIf="value_11 != null && value_12 != null && value_13 != null && value_14 != null && value_15 != null && value_16 != null" class="row form-stacked-row" >\n           <div class="col legend-box">\n                 <span class="legend-box-heading"></span>\n             <div class="row form-stacked-row">\n\n                      <div class="col col-50">\n                          <div *ngIf="value_10 != null">\n                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_11}}</span>\n                                 <input readonly="readonly" type="text" class="fview" id="feedback_field_11" name="feedback_field_11"  [(ngModel)]="value_11" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                              </label>\n                          </div>\n                      </div>\n\n                      <div class="col col-50">\n                        <div *ngIf="value_11 != null">\n                           <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_12}}</span>\n                             \n                             <input readonly="readonly" type="text" class="fview" id="feedback_field_12" name="feedback_field_12"  [(ngModel)]="value_12" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                          </label>\n                        </div>\n                           </div>\n             </div>\n\n              <div class="row form-stacked-row"> \n                        <div class="col col-50">\n                          <div *ngIf="value_13 != null">\n                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_13}}</span>\n                 <input readonly="readonly" type="text" class="fview" id="feedback_field_13" name="feedback_field_13"  [(ngModel)]="value_13" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n                              </label>\n                          </div>\n                      </div>\n\n                        <div class="col col-50">\n                          <div *ngIf="value_14 != null">\n                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_14}}</span>\n                 <input readonly="readonly" type="text" class="fview" id="feedback_field_14" name="feedback_field_14"  [(ngModel)]="value_14" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n                              </label>\n                          </div>\n                      </div>\n              </div>\n\n              <div class="row form-stacked-row"> \n\n                        <div class="col col-50">\n                          <div *ngIf="value_15 != null">\n                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_15}}</span>\n                 <input readonly="readonly" type="text" class="fview" id="feedback_field_15" name="feedback_field_15"  [(ngModel)]="value_15" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n                              </label>\n                          </div>\n                      </div>\n\n                        <div class="col col-50">\n                          <div *ngIf="value_16 != null">\n                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_16}}</span>\n                 <input readonly="readonly" type="text" class="fview" id="feedback_field_16" name="feedback_field_16"  [(ngModel)]="value_16" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n                              </label>\n                          </div>\n                      </div>\n\n              </div>\n\n\n          </div>\n        </div>\n\n\n\n\n\n           <div *ngIf="value_17 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">{{label_17}}</span>\n                 \n                <input readonly="readonly" type="text" class="fview" id="feedback_field_17" name="feedback_field_17"  [(ngModel)]="value_17" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n \n\n\n            <div *ngIf="value_18 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">{{label_18}}</span>\n                 \n              <input readonly="readonly" type="text" class="fview" id="feedback_field_18" name="feedback_field_18"  [(ngModel)]="value_18" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n\n\n            <div *ngIf="value_19 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">{{label_19}}</span>\n                 \n                  <input readonly="readonly" type="text" class="fview" id="feedback_field_19" name="feedback_field_19"  [(ngModel)]="value_19" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n   \n\n\n            <div *ngIf="value_20 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">{{label_20}}</span>                 \n                  <input readonly="readonly" type="text" class="fview" id="feedback_field_20" name="feedback_field_20"  [(ngModel)]="value_20" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n\n\n\n            <div *ngIf="value_21 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">{{label_21}}</span>\n                             \n             <input readonly="readonly" type="text" class="fview" id="feedback_field_21" name="feedback_field_21"  [(ngModel)]="value_21" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n\n\n\n            <div *ngIf="value_22 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">{{label_22}}</span>\n                 \n                 <input readonly="readonly" type="text" class="fview" id="feedback_field_22" name="feedback_field_22"  [(ngModel)]="value_22" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n\n                \n             \n\n\n\n\n\n\n       <div  *ngIf="value_23 != null && value_24 != null && value_25 != null && value_26 != null && value_27 != null"  class="row form-stacked-row">\n           <div class="col legend-box">\n                 <span class="legend-box-heading"> </span>\n\n             <div class="row form-stacked-row">\n                      <div class="col col-50">\n                          <div *ngIf="value_23 != null">\n                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_23}}</span>\n                                  <input readonly="readonly" type="text" class="fview" id="feedback_field_23" name="feedback_field_23"  [(ngModel)]="value_23" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                              </label>\n                          </div>\n                      </div>\n\n                      <div class="col col-50">\n                        <div *ngIf="value_24 != null">\n                           <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_24}}</span>\n                             <input readonly="readonly" type="text" class="fview" id="feedback_field_24" name="feedback_field_24"  [(ngModel)]="value_24" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                          </label>\n                        </div>\n                           </div>\n             </div>\n\n\n             <div class="row form-stacked-row">\n\n                      <div class="col col-50">\n                          <div *ngIf="value_25 != null">\n                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_25}}</span>\n                                 <input readonly="readonly" type="text" class="fview" id="feedback_field_25" name="feedback_field_25"  [(ngModel)]="value_25" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                              </label>\n                          </div>\n                      </div>\n\n                      <div class="col col-50">\n                        <div id="">\n                           <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">  </span>\n                             \n                          </label>\n                        </div>\n                           </div>\n\n\n             </div>\n\n             <div class="row form-stacked-row">\n                      <div class="col">\n                        <div *ngIf="value_26 != null">\n                           <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;">{{label_26}}</span>\n                             <input readonly="readonly" type="text" class="fview" id="feedback_field_26" name="feedback_field_26"  [(ngModel)]="value_26" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                          </label>\n                        </div>\n                           </div>\n              </div>\n\n             <div class="row form-stacked-row">\n\n                      <div class="col ">\n                          <div *ngIf="value_27 != null">\n                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;"> {{label_27}} </span>\n                                  <input readonly="readonly" type="text" class="fview" id="feedback_field_27" name="feedback_field_27"  [(ngModel)]="value_27" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                              </label>\n                          </div>\n                      </div>\n\n                 \n             </div>\n          </div>\n        </div>\n\n\n\n\n\n\n\n            <div *ngIf="value_28 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;"> {{label_28}} </span>\n                 \n                <input readonly="readonly" type="text" class="fview" id="feedback_field_28" name="feedback_field_28"  [(ngModel)]="value_28" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n             \n\n\n\n\n\n\n           <div *ngIf="value_29 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;" > {{label_29}}</span>\n                 \n                <input readonly="readonly" type="text" class="fview" id="feedback_field_29" name="feedback_field_29"  [(ngModel)]="value_29" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n          \n\n\n            <div *ngIf="value_30 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">{{label_30}}</span>\n                 \n                <input readonly="readonly" type="text" class="fview" id="feedback_field_30" name="feedback_field_30"  [(ngModel)]="value_30" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n           \n\n\n\n            <div *ngIf="value_31 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">{{label_31}}</span>\n                 \n                 <input readonly="readonly" type="text" class="fview" id="feedback_field_31" name="feedback_field_31"  [(ngModel)]="value_31" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n         \n\n\n\n            <div *ngIf="value_32 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">  {{label_32}}     </span>\n                 \n                <input readonly="readonly" type="text" class="fview" id="feedback_field_32" name="feedback_field_32"  [(ngModel)]="value_32" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n            \n\n\n\n            <div *ngIf="value_33 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">{{label_33}}</span>\n                 \n                <input readonly="readonly" type="text" class="fview" id="feedback_field_33" name="feedback_field_33"  [(ngModel)]="value_33" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n\n\n\n\n            <div *ngIf="value_34 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">    {{label_34}}     </span>\n                 \n                <input readonly="readonly" type="text" class="fview" id="feedback_field_34" name="feedback_field_34"  [(ngModel)]="value_34" ng-minlength="1" ng-maxlength="255" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n               </label>\n            </div>\n                \n\n\n\n\n\n        \n            <div *ngIf="value_35 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;">{{label_35}}</span>\n                 \n                 <textarea class="fview" rows="8" cols="10" id="feedback_field_35" name="feedback_field_35" [(ngModel)]="value_35"  ></textarea>\n\n               </label>\n            </div>\n                \n                  \n\n            </div>\n	</form>\n\n	 <div class="list list1" *ngIf="dataFound === false">\n            <div class="no-box">  <img src=\'assets/imgs/icon-no-comment.png\'><div class="clearfix"> </div>\n            <h3 class="text-center">Feedback not given for this week.</h3> \n             </div>\n        </div>\n</ion-scroll>\n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/view-feedback-form/view-feedback-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
    ], ViewFeedbackFormPage);
    return ViewFeedbackFormPage;
}());

//# sourceMappingURL=view-feedback-form.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewFeedbackFormMonthlyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_constants__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the ViewFeedbackFormMonthlyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewFeedbackFormMonthlyPage = /** @class */ (function () {
    function ViewFeedbackFormMonthlyPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.base_url = __WEBPACK_IMPORTED_MODULE_6__app_constants__["d" /* wsBaseUrl */];
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
    ViewFeedbackFormMonthlyPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ViewFeedbackFormMonthlyPage');
        console.log(this.base_url);
        var url = this.base_url + 'userServices/view_feedback_fields';
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var feedback_type = 'Monthly';
        var purpose = 'view';
        var httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&spiritual_buddie_user_id=" + this.navParams.get('sp_userid') + "&purpose=" + purpose + "&use_date_filter=1" + "&selected_date=" + this.navParams.get('selected_date');
        //console.log(httpBody);
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            // console.log(obj.data[0]);
            if (obj.response == 'S') {
                _this.label_1 = obj.data[0].feedback_field_label;
                _this.label_2 = obj.data[1].feedback_field_label;
                _this.label_3 = obj.data[2].feedback_field_label;
                _this.label_4 = obj.data[3].feedback_field_label;
                _this.label_5 = obj.data[4].feedback_field_label;
                _this.label_6 = obj.data[5].feedback_field_label;
                _this.label_7 = obj.data[6].feedback_field_label;
                _this.value_1 = obj.data[0].user_feedback_field_value;
                _this.value_2 = obj.data[1].user_feedback_field_value;
                _this.value_3 = obj.data[2].user_feedback_field_value;
                _this.value_4 = obj.data[3].user_feedback_field_value;
                _this.value_5 = obj.data[4].user_feedback_field_value;
                _this.value_6 = obj.data[5].user_feedback_field_value;
                _this.value_7 = obj.data[6].user_feedback_field_value;
                _this.dataFound = true;
            }
            else {
                _this.dataFound = false;
            }
        }, function (error) {
            console.log(error);
        });
    };
    ViewFeedbackFormMonthlyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-view-feedback-form-monthly',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/view-feedback-form-monthly/view-feedback-form-monthly.html"*/'<!--\n  Generated template for the MyBuddyWeeklyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title><small style="font-size: 18px;">Monthly Feedback</small></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="has-header has-header-inner1" >\n	<!-- [formGroup]="WeeklyForm" -->\n	<ion-scroll width="auto" scrollY style="height:600px;width: auto;">\n		<form   class="list login-form form1"  *ngIf="dataFound === true"> \n                <div class="list">\n           \n       <div class="row form-stacked-row" *ngIf="value_1 != null && value_2 != null && value_3 != null" >\n           <div class="col legend-box">\n                 <span class="legend-box-heading"></span>\n             \n\n\n             <div *ngIf="value_1 != null && value_2 != null" class="row form-stacked-row">\n\n                      <div *ngIf="value_1 != null" class="col col-50">\n                          <div >\n                                <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;" > {{label_1}} </span>\n                        <input  type="text" class="fview" name="feedback_field_51" [(ngModel)]="value_1" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" > <span class="percent-symbol">%</span>\n                              </label>\n                          </div>\n                      </div>\n\n                      <div class="col col-50" *ngIf="value_2 != null">\n                        <div  >\n                           <label class="item item-input item-stacked-label"> <span class="input-label" style="white-space:pre-wrap;" >  {{label_2}} </span>\n                        <input readonly="readonly" type="text" class="fview" name="feedback_field_52" [(ngModel)]="value_2" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >   \n                          </label>\n                        </div>\n                           </div>\n             </div>\n\n\n             <div class="row form-stacked-row" *ngIf="value_3 != null">\n                  <div class="col ">\n               <div >\n                    <label  class="item item-input item-stacked-label" >\n                    <span class="input-label" style="white-space:pre-wrap;" > {{label_3}} </span>\n                     <textarea class="fview" rows="8" cols="10" id="feedback_field_53" name="feedback_field_53" [(ngModel)]="value_3" ></textarea>\n                   </label>\n                </div>\n                  </div>\n              </div>\n          </div>\n        </div>\n\n\n       <div class="row form-stacked-row" *ngIf="value_4 != null && value_5 != null">\n           <div class="col legend-box">\n                 <span class="legend-box-heading"> Service  </span>\n             \n\n             <div class="row form-stacked-row" *ngIf="value_4 != null">\n                   <div >\n                        <label  class="item item-input item-stacked-label" >\n                        <span class="input-label" style="white-space:pre-wrap;" > {{label_4}} </span>\n                         <input readonly="readonly" type="text" class="fview" name="feedback_field_54" [(ngModel)]="value_4" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" > \n\n                       </label>\n                    </div>\n             </div>\n\n             <div class="row form-stacked-row" *ngIf="value_5 != null">\n                  <div >\n                        <label  class="item item-input item-stacked-label" >\n                        <span class="input-label" style="white-space:pre-wrap;" > {{label_5}} </span>\n                          <input readonly="readonly" type="text" class="fview" name="feedback_field_55"[(ngModel)]="value_5" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" > \n\n                       </label>\n                    </div>\n             </div>\n\n\n          </div>\n        </div>\n\n\n\n\n           <div *ngIf="value_6 != null">\n                <label  class="item item-input item-stacked-label" >\n                <span class="input-label" style="white-space:pre-wrap;" > {{label_6}}</span>\n                 <textarea class="fview" rows="8" cols="10" id="feedback_field_56" name="feedback_field_56" [(ngModel)]="value_6" ></textarea>\n               </label>\n            </div>\n                \n\n\n\n       <!-- <div class="row form-stacked-row" >\n           <div class="col legend-box">\n                 <span class="legend-box-heading"></span>\n\n\n             <div class="row form-stacked-row">\n                   <div >\n                        <label  class="item item-input item-stacked-label" >\n                        <span class="input-label" style="white-space:pre-wrap;"></span>\n\n                     <input readonly="readonly" type="text" class="fview" name="feedback_field_57" ([ngModel])="feedback_field_57" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                       </label>\n                    </div>\n             </div>\n\n             <div class="row form-stacked-row">\n                    <div >\n                        <label  class="item item-input item-stacked-label" >\n                        <span class="input-label" style="white-space:pre-wrap;" >   </span>\n\n                        <input readonly="readonly" type="text" class="fview" name="feedback_field_58" ng-model="feedbackMonthlyFormData.feedback_field_58" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n                       </label>\n                    </div>\n             </div>\n\n\n             <div class="row form-stacked-row">\n                   <div>\n                        <label  class="item item-input item-stacked-label" >\n                        <span class="input-label" style="white-space:pre-wrap;" ></span>\n                        <input readonly="readonly" type="text" class="fview" name="feedback_field_59" ng-model="feedbackMonthlyFormData.feedback_field_59" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                       </label>\n                    </div>\n             </div>\n\n             <div class="row form-stacked-row">\n                    <div >\n                        <label  class="item item-input item-stacked-label" >\n                        <span class="input-label" style="white-space:pre-wrap;" ></span>\n\n                        <input readonly="readonly" type="text" class="fview" name="feedback_field_60" ng-model="feedbackMonthlyFormData.feedback_field_60" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n\n                       </label>\n                    </div>\n             </div>\n\n\n             <div class="row form-stacked-row">\n                  <div >\n                        <label  class="item item-input item-stacked-label" >\n                        <span class="input-label" style="white-space:pre-wrap;" ></span>\n                        <input readonly="readonly" type="text" class="fview" name="feedback_field_61" ng-model="feedbackMonthlyFormData.feedback_field_61" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"  >\n                       </label>\n                    </div>\n             </div>\n\n\n\n          </div>\n        </div> -->\n\n\n\n            </div>\n       \n	</form>\n	 <div class="list list1" *ngIf="dataFound === false">\n            <div class="no-box">  <img src=\'assets/imgs/icon-no-comment.png\'><div class="clearfix"> </div>\n            <h3 class="text-center">Feedback not given for this month.</h3>\n             </div>\n        </div>\n </ion-scroll>\n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/view-feedback-form-monthly/view-feedback-form-monthly.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
    ], ViewFeedbackFormMonthlyPage);
    return ViewFeedbackFormMonthlyPage;
}());

//# sourceMappingURL=view-feedback-form-monthly.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranierFeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the TranierFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TranierFeedbackPage = /** @class */ (function () {
    function TranierFeedbackPage(navCtrl, navParams, formBuilder, http, loadingCtrl, menu, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.TranierForm = formBuilder.group({
            feedback_field_62: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required],
            feedback_field_63: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* Validators */].required],
            feedback_field_64: ['', ''],
            feedback_field_65: ['', ''],
            feedback_field_66: ['', ''],
            feedback_field_67: ['', ''],
            feedback_field_68: ['', ''],
            feedback_field_69: ['', '']
        });
        this.device_id = __WEBPACK_IMPORTED_MODULE_6__app_constants__["a" /* device_id */];
        this.role_id = __WEBPACK_IMPORTED_MODULE_6__app_constants__["b" /* role_id */];
        this.base_url = __WEBPACK_IMPORTED_MODULE_6__app_constants__["d" /* wsBaseUrl */];
        this.version_name = __WEBPACK_IMPORTED_MODULE_6__app_constants__["c" /* versionName */];
        this.selected_date = this.navParams.get('yearStart') + '-' + this.navParams.get('FinalmonthStart') + '-01 00:00:00';
        console.log(this.selected_date);
        var url = this.base_url + 'userServices/spritual_trainer_view_feedback_fields';
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        // CALL view_feedback_fields
        var feedback_type = 'for trainers';
        var httpBody = "feedback_type=" + feedback_type + "&access_token=" + localStorage.getItem('auth_token') + "&selected_date=" + this.selected_date;
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var objViewFeedback = JSON.parse(responseData);
            if (objViewFeedback.version_name == _this.version_name) {
                if (objViewFeedback.response == 'S') {
                    var mapped = Object.entries(objViewFeedback.data).map(function (_a) {
                        var sp_id = _a[0], value = _a[1];
                        return ({ sp_id: sp_id, value: value });
                    });
                    console.log(mapped[0].value['user_feedback_field_value']);
                    if (mapped[0]) {
                        _this.feedback_field_id_62 = (mapped[0].value['user_feedback_field_value'] == 'undefined') ? '' : mapped[0].value['user_feedback_field_value'];
                    }
                    if (mapped[1]) {
                        _this.feedback_field_id_63 = (mapped[1].value['user_feedback_field_value'] == 'undefined') ? '' : mapped[1].value['user_feedback_field_value'];
                    }
                    if (mapped[2]) {
                        _this.feedback_field_id_64 = (mapped[2].value['user_feedback_field_value'] == 'undefined') ? '' : mapped[2].value['user_feedback_field_value'];
                        //this.feedback_field_id_64 = mapped[2].value['user_feedback_field_value'];
                    }
                    if (mapped[3]) {
                        _this.feedback_field_id_65 = (mapped[3].value['user_feedback_field_value'] == 'undefined') ? '' : mapped[3].value['user_feedback_field_value'];
                        //this.feedback_field_id_65 = mapped[3].value['user_feedback_field_value'];
                    }
                    if (mapped[4]) {
                        _this.feedback_field_id_66 = (mapped[4].value['user_feedback_field_value'] == 'undefined') ? '' : mapped[4].value['user_feedback_field_value'];
                        //this.feedback_field_id_66 = mapped[4].value['user_feedback_field_value'];
                    }
                    if (mapped[5]) {
                        _this.feedback_field_id_67 = (mapped[5].value['user_feedback_field_value'] == 'undefined') ? '' : mapped[5].value['user_feedback_field_value'];
                        //this.feedback_field_id_67 = mapped[5].value['user_feedback_field_value'];
                    }
                    if (mapped[6]) {
                        _this.feedback_field_id_68 = (mapped[6].value['user_feedback_field_value'] == 'undefined') ? '' : mapped[6].value['user_feedback_field_value'];
                        //this.feedback_field_id_68 = mapped[6].value['user_feedback_field_value'];
                    }
                    if (mapped[7]) {
                        _this.feedback_field_id_69 = (mapped[7].value['user_feedback_field_value'] == 'undefined') ? '' : mapped[7].value['user_feedback_field_value'];
                        //this.feedback_field_id_69 = mapped[7].value['user_feedback_field_value'];
                    }
                }
            }
            else {
                //loading.dismiss();
                _this.showErrorVersionAlert();
                _this.navCtrl.pop();
            }
        }, function (error) {
            console.log(error);
        });
    }
    TranierFeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TranierFeedbackPage');
    };
    TranierFeedbackPage.prototype.TranierFormData = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var httpBody = "feedback_field_62=" + this.TranierForm.value.feedback_field_62 + "&feedback_field_63=" + this.TranierForm.value.feedback_field_63 + "&feedback_field_64=" + this.TranierForm.value.feedback_field_64 + "&feedback_field_65=" + this.TranierForm.value.feedback_field_65 + "&feedback_field_66=" + this.TranierForm.value.feedback_field_66 + "&feedback_field_67=" + this.TranierForm.value.feedback_field_67 + "&feedback_field_68=" + this.TranierForm.value.feedback_field_68 + "&feedback_field_69=" + this.TranierForm.value.feedback_field_69 + "&role_id=" + this.role_id + "&selected_date=" + this.selected_date + "&access_token=" + localStorage.getItem('auth_token') + "&device_id=" + this.device_id + "&device_type=" + localStorage.getItem('device_type');
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var url = this.base_url + 'userServices/spritual_trainer_feedback_fields';
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData2 = data["_body"];
            var obj = JSON.parse(responseData2);
            if (obj.response == 'S') {
                loading.dismiss();
                _this.showSuccessAlert();
                _this.navCtrl.pop();
            }
            else {
                _this.showErrorAlert();
            }
        }, function (error) {
            console.log(error);
        });
    };
    TranierFeedbackPage.prototype.showSuccessAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Your Feedback is successfully submitted.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    TranierFeedbackPage.prototype.showErrorAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Error in network, Please try again later!.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    // showErrorVersionAlert() {
    //   let basicAlert = this.alertCtrl.create({
    //     title: 'Notification',
    //     subTitle: 'Please update your app version.'
    //   });
    //   basicAlert.present();
    // }
    TranierFeedbackPage.prototype.showErrorVersionAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Atma Namastey',
            message: 'Current version of your app is outdated. Please upgrade to newer version in order to continue.',
            buttons: [
                {
                    text: 'Update Version',
                    role: 'cancel',
                    handler: function () {
                        window.open("https://play.google.com/store/apps/details?id=ypv.spirt.buddy&hl=en", "_system");
                    }
                }
            ]
        });
        basicAlert.present();
    };
    TranierFeedbackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tranier-feedback',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/tranier-feedback/tranier-feedback.html"*/'<!--\n  Generated template for the MyBuddyWeeklyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title><small style="font-size: 18px;">Monthly Feedback</small></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="has-header has-header-inner1" >\n	   <ion-scroll width="auto" scrollY style="height:600px;width: auto;">\n		<form  [formGroup]="TranierForm" class="list login-form form1" (ngSubmit)="TranierFormData()"> \n               \n		            <!-- <input name="role_id" value="" type="hidden" ng-model="tranierFormData.role_id" />\n            <input name="device_id" value="" type="hidden" ng-model="tranierFormData.device_id" />\n            <input name="device_type" value="" type="hidden" ng-model="tranierFormData.device_type" />\n            <input name="access_token" value="" type="hidden" ng-model="tranierFormData.access_token" />\n            <input type="hidden" name="monthStart" ng-model="tranierFormData.monthStart" value=""/>\n            <input type="hidden" name="yearStart" ng-model="tranierFormData.yearStart" value=""/> -->\n            <div class="list">\n                 <div class="row form-stacked-row">\n                     <div class="col legend-box">\n                         <!-- <div class="row form-stacked-row">\n                               <div>\n                                    <label  class="item item-input item-stacked-label" >\n                                    <span  style="white-space:pre-wrap;">Select a month and year </span></label>\n                                    <div class="row responsive-sm">\n                                        <div class="col slide-footer">\n                                            <a href="#" ng-click="getPreviousMonth()"><img src="img/arrow-left1.png" class="img-marr"></a>\n                                             {{ monthStartinWords }}, {{ yearStart }}\n                                            <a href="#" ng-click="getNextMonth()"><img src="img/arrow-right2.png" class="img-marl"></a>\n                                            \n                                        </div>\n                                    </div>\n                                </div>\n                         </div> -->\n                         <div class="row form-stacked-row">\n                               <div>\n                                    <label  class="item item-input item-stacked-label" >\n                                        <span class="input-label" style="white-space:pre-wrap;">No. of nurtuning session conducted in last month</span>\n                                        <input type="text" class=""  formControlName="feedback_field_62" [(ngModel)]="feedback_field_id_62" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                                   </label>\n                                </div>\n                         </div>\n\n                         <div class="row form-stacked-row">\n                                <div>\n                                    <label  class="item item-input item-stacked-label" >\n                                        <span class="input-label" style="white-space:pre-wrap;" >How many classes conducted in last one month course wise</span>\n                                        <input type="text" class="" formControlName="feedback_field_63" [(ngModel)]="feedback_field_id_63" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                                    </label>\n                                </div>\n                         </div>\n\n                         <div class="row form-stacked-row">\n                               <div>\n                                    <label  class="item item-input item-stacked-label" >\n                                    <span class="input-label" style="white-space:pre-wrap;" >No. of students generated during last month course wise</span>\n                                    <input type="text" class="" formControlName="feedback_field_64" [(ngModel)]="feedback_field_id_64" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                                   </label>\n                                </div>\n                         </div>\n\n                         <div class="row form-stacked-row">\n                                <div>\n                                    <label  class="item item-input item-stacked-label" >\n                                        <span class="input-label" style="white-space:pre-wrap;" >No. of students motivated for higher courses</span>\n                                        <input type="text" class="" formControlName="feedback_field_65" [(ngModel)]="feedback_field_id_65" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                                    </label>\n                                </div>\n                         </div>\n\n                         <div class="row form-stacked-row">\n                              <div>\n                                    <label  class="item item-input item-stacked-label" >\n                                    <span class="input-label" style="white-space:pre-wrap;" > No. of new students motivated to join morning  webinar during the month</span>\n                                    <input type="text" class="" formControlName="feedback_field_66" [(ngModel)]="feedback_field_id_66" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"  >\n                                   </label>\n                                </div>\n                         </div>\n\n                         <div class="row form-stacked-row">\n                              <div>\n                                    <label  class="item item-input item-stacked-label" >\n                                    <span class="input-label" style="white-space:pre-wrap;" >Tithing</span>\n                                    <input type="text" class="tithing" formControlName="feedback_field_67" [(ngModel)]="feedback_field_id_67" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"  >\n                                   </label>\n                                </div>\n                         </div>\n\n                         <div class="row form-stacked-row">\n                              <div>\n                                    <label  class="item item-input item-stacked-label" >\n                                    <span class="input-label" style="white-space:pre-wrap;" >Service hours</span>\n                                    <input type="text" class="service_hours" formControlName="feedback_field_68" [(ngModel)]="feedback_field_id_68" ng-maxlength="100" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"  >\n                                   </label>\n                                </div>\n                         </div>\n\n                         <div class="row form-stacked-row">\n                            <div class="col ">\n                               <div id="ff_53">\n                                    <label class="item item-input item-stacked-label">\n                                    <span class="input-label ng-binding" style="white-space:pre-wrap;" aria-label="" id="_label-10">Service details </span>\n                                     <textarea  class="ng-pristine ng-untouched ng-valid" rows="8" cols="10" id="feedback_field_64" formControlName="feedback_field_69" [(ngModel)]="feedback_field_id_69"></textarea>\n                                   </label>\n                                </div>\n                            </div>\n                         </div>\n                    </div>\n                  </div>\n\n                <div class="success-msg">{{ flash_success }}</div>\n                <div class="has-error">{{ flash_failure }} </div>\n\n                <button [disabled]="!TranierForm.valid"type="submit" class="button button-stable button-block btn-login">SAVE</button>\n            </div>\n	</form>\n</ion-scroll>\n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/tranier-feedback/tranier-feedback.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], TranierFeedbackPage);
    return TranierFeedbackPage;
}());

//# sourceMappingURL=tranier-feedback.js.map

/***/ }),

/***/ 125:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return role_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return device_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return versionName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return wsBaseUrl; });
var role_id = 3;
var device_id = 'HT9CTP820988';
/* Web service urls */
var _protocol = 'http';
var wsBasePath = _protocol + "://" + "ypvhealing.com/feedback/"; //production server
var versionName = '2.0';
// var wsBasePath = _protocol+"://"+"dev.galaxyweblinks.com/ypv-feedback/";
//var  wsBasePath = _protocol+"://"+"ypv-feedback.galaxyweblinks.in/"; // dev server //
//export const versionName = '2.0';
//var wsBasePath = _protocol+"://"+"192.168.7.201:81/ypv-feedback/dev/"; // shoaib
//var wsBasePath = _protocol+"://"+"192.168.8.75/ypv-feedback/dev/"; // sir
// var wsBasePath = _protocol+"://"+"192.168.0.60/ypv-feedback/dev/";
// var wsBasePath = _protocol+"://"+"192.168.0.58/ypv-feedback/dev/";
//var wsBasePath = _protocol+"://"+"localhost/ypv-feedback/dev/";
var wsModule = "api/";
var wsBaseUrl = wsBasePath + wsModule;
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-buddy/add-buddy.module": [
		298,
		16
	],
	"../pages/change-password/change-password.module": [
		299,
		5
	],
	"../pages/forgot-password/forgot-password.module": [
		300,
		15
	],
	"../pages/home/home.module": [
		301,
		4
	],
	"../pages/login/login.module": [
		167
	],
	"../pages/logout/logout.module": [
		302,
		3
	],
	"../pages/menu/menu.module": [
		303,
		2
	],
	"../pages/my-buddies/my-buddies.module": [
		310,
		14
	],
	"../pages/my-buddy-monthly/my-buddy-monthly.module": [
		311,
		13
	],
	"../pages/my-buddy-weekly/my-buddy-weekly.module": [
		314,
		12
	],
	"../pages/special/special.module": [
		304,
		1
	],
	"../pages/splash/splash.module": [
		305,
		11
	],
	"../pages/tabs/tabs.module": [
		306,
		0
	],
	"../pages/tranier-feedback-select-date/tranier-feedback-select-date.module": [
		307,
		10
	],
	"../pages/tranier-feedback/tranier-feedback.module": [
		312,
		9
	],
	"../pages/view-feedback-form-monthly/view-feedback-form-monthly.module": [
		308,
		8
	],
	"../pages/view-feedback-form/view-feedback-form.module": [
		313,
		7
	],
	"../pages/view-feedback/view-feedback.module": [
		309,
		6
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 166;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]
            ]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyBuddiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_my_buddy_weekly_my_buddy_weekly__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_my_buddy_monthly_my_buddy_monthly__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_add_buddy_add_buddy__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the MyBuddiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyBuddiesPage = /** @class */ (function () {
    function MyBuddiesPage(navCtrl, navParams, http, loadingCtrl, menu, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.week_start_date = "";
        this.base_url = __WEBPACK_IMPORTED_MODULE_2__app_constants__["d" /* wsBaseUrl */];
        this.version_name = __WEBPACK_IMPORTED_MODULE_2__app_constants__["c" /* versionName */];
        //console.log(this.version_name);
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.yearStart = (new Date()).getFullYear();
        this.monthStart = (new Date()).getMonth();
        this.monthStartinWords = this.monthNames[this.monthStart];
        var url = this.base_url + 'userServices/getYearWeek';
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var httpBody = "year=" + this.yearStart;
        this.http.post(url, httpBody, { headers: headers })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            _this.yearWeeks = obj.yearWeeks;
            _this.weekID = obj.week.idWeek;
            _this.weekStartDate = obj.week.week_start_date;
            _this.weekEndDate = obj.week.week_end_date;
        }, function (error) {
            console.log(error);
        });
    }
    MyBuddiesPage.prototype.ionViewDidLoad = function () {
        this.pageName = this.navParams.get('pageName');
    };
    MyBuddiesPage.prototype.changeShowStatus = function (user_id, hide) {
        if (this.currentPerson === user_id) {
            if (hide == 1) {
                this.currentPersonForRadio = null;
                this.currentPerson = null;
                return;
            }
            else {
                this.showHide = !this.showHide;
                return;
            }
        }
        this.checkOpenDiv = 1;
        this.currentPersonForRadio = null;
        this.currentPerson = user_id;
    };
    MyBuddiesPage.prototype.changeShowStatusRadio = function (feedback) {
        if (this.currentPersonForRadio === feedback) {
            //return;
            this.showHide = !this.showHide;
            return;
        }
        this.currentPersonForRadio = feedback;
    };
    MyBuddiesPage.prototype.getPreviousMonth = function () {
        if (this.monthStart == 0) {
            this.yearStart = this.yearStart - 1;
            this.monthStart = 11;
        }
        else {
            this.monthStart = this.monthStart - 1;
        }
        this.monthStartinWords = this.monthNames[this.monthStart];
    };
    MyBuddiesPage.prototype.getNextMonth = function () {
        if (this.monthStart == 11) {
            this.yearStart = this.yearStart + 1;
            this.monthStart = 0;
        }
        else {
            this.monthStart = this.monthStart + 1;
        }
        this.monthStartinWords = this.monthNames[this.monthStart];
    };
    MyBuddiesPage.prototype.getPreviousWeek = function () {
        var _this = this;
        var wsd_arr = this.weekStartDate.split('/');
        var wed_arr = this.weekEndDate.split('/');
        var length = this.yearWeeks.length;
        var previousCount = this.yearWeeks.length;
        this.yearWeeks.forEach(function (item) {
            var sd_arr = item['week_start_date'].split('/');
            var ed_arr = item['week_end_date'].split('/');
            //console.log(sd_arr);
            if ((wsd_arr[0] == ed_arr[0]) && (wsd_arr[1] == ed_arr[1])) {
                if (previousCount == length) {
                    var year = parseInt(wsd_arr[2]) - 1;
                    var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
                    headers.append("Content-Type", "application/x-www-form-urlencoded");
                    var httpBody = "year=" + _this.yearStart;
                    var url = _this.base_url + 'userServices/getYearWeek';
                    _this.http.post(url, httpBody, { headers: headers })
                        .subscribe(function (data) {
                        var responseData = data["_body"];
                        var obj = JSON.parse(responseData);
                        _this.yearWeeks = obj.yearWeeks;
                        _this.getPreviousWeek();
                    }, function (error) {
                        console.log(error);
                    });
                }
                _this.weekID = item['idWeek'];
                _this.weekStartDate = item['week_start_date'];
                _this.weekEndDate = item['week_end_date'];
            }
            previousCount--;
        });
    };
    MyBuddiesPage.prototype.getNextWeek = function () {
        var _this = this;
        var wsd_arr = this.weekStartDate.split('/');
        var wed_arr = this.weekEndDate.split('/');
        length = this.yearWeeks.length;
        var nextCount = this.yearWeeks.length;
        this.yearWeeks.forEach(function (item) {
            var sd_arr = item['week_start_date'].split('/');
            var ed_arr = item['week_end_date'].split('/');
            if ((wed_arr[0] == sd_arr[0]) && (wed_arr[1] == sd_arr[1])) {
                if (nextCount == 1) {
                    var year = +parseInt(wsd_arr[2]) + +1;
                    var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
                    headers.append("Content-Type", "application/x-www-form-urlencoded");
                    var httpBody = "year=" + _this.yearStart;
                    var url = _this.base_url + 'userServices/getYearWeek';
                    _this.http.post(url, httpBody, { headers: headers })
                        .subscribe(function (data) {
                        var responseData = data["_body"];
                        var obj = JSON.parse(responseData);
                        _this.yearWeeks = obj.yearWeeks;
                        _this.getNextWeek();
                    }, function (error) {
                        console.log(error);
                    });
                }
                _this.weekID = item['idWeek'];
                _this.weekStartDate = item['week_start_date'];
                _this.weekEndDate = item['week_end_date'];
            }
            nextCount--;
        });
    };
    MyBuddiesPage.prototype.weeklyForm = function (userId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_my_buddy_weekly_my_buddy_weekly__["a" /* MyBuddyWeeklyPage */], {
            weekStartDate: this.weekStartDate,
            weekEndDate: this.weekEndDate,
            weekID: this.weekID,
            userId: userId
        });
    };
    MyBuddiesPage.prototype.monthlyForm = function (userId) {
        var selectedMonth = this.monthStart + 1;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_my_buddy_monthly_my_buddy_monthly__["a" /* MyBuddyMonthlyPage */], {
            monthStart: selectedMonth,
            yearStart: this.yearStart,
            userId: userId
        });
    };
    MyBuddiesPage.prototype.add_buddy = function () {
        //console.log('Hello Add Buddies');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_add_buddy_add_buddy__["a" /* AddBuddyPage */]);
    };
    MyBuddiesPage.prototype.ionViewWillEnter = function () {
        this.getBuddiesList(this.pageName);
    };
    MyBuddiesPage.prototype.getBuddiesList = function (pageName) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var httpBody = "access_token=" + localStorage.getItem('auth_token') + "&version_name=" + localStorage.getItem('version_name');
        var url = this.base_url + 'userServices/getMyBuddies';
        this.http.post(url, httpBody, { headers: headers })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            if (_this.version_name == obj.version_name) {
                if (obj.response == 'F') {
                }
                else {
                    loading.dismiss();
                    _this.Buddies_data = obj.data;
                    _this.dataArr = _this.Buddies_data;
                }
            }
            else {
                loading.dismiss();
                _this.showErrorAlert();
                _this.navCtrl.pop();
            }
        }, function (error) {
            console.log(error);
        });
    };
    //  showErrorAlert() {
    //   let basicAlert = this.alertCtrl.create({
    //     title: 'Notification',
    //     subTitle: 'Please update your app version.',
    //   });
    //   basicAlert.present();
    // }
    MyBuddiesPage.prototype.showErrorAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Atma Namastey',
            message: 'Current version of your app is outdated. Please upgrade to newer version in order to continue.',
            buttons: [
                {
                    text: 'Update Version',
                    role: 'cancel',
                    handler: function () {
                        window.open("https://play.google.com/store/apps/details?id=ypv.spirt.buddy&hl=en", "_system");
                    }
                }
            ]
        });
        basicAlert.present();
    };
    MyBuddiesPage.prototype.removeBuddy = function (buddyId) {
        var _this = this;
        if (buddyId != '') {
            var url = this.base_url + 'userServices/removeBuddy';
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            var httpBody = "access_token=" + localStorage.getItem('auth_token') + "&version_name=" + localStorage.getItem('version_name') + "&buddy_user_id=" + buddyId;
            this.http.post(url, httpBody, { headers: headers })
                .subscribe(function (data) {
                var responseData = data["_body"];
                var obj = JSON.parse(responseData);
                if (obj.response == 'S') {
                    _this.getBuddiesList(_this.pageName);
                }
                else {
                    _this.presentAlert();
                }
            }, function (error) {
                console.log(error);
            });
        }
    };
    MyBuddiesPage.prototype.removeBuddyAlert = function (buddyId) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Remove buddy',
            message: 'Are you sure , you want to remove?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        // do nothing, user tapped cancel
                    }
                },
                {
                    text: 'Remove',
                    handler: function () {
                        _this.removeBuddy(buddyId);
                    }
                }
            ]
        });
        confirm.present();
    };
    MyBuddiesPage.prototype.presentAlert = function () {
        var confirm = this.alertCtrl.create({
            title: 'Error',
            message: 'Something went wrong, Please try again later',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: function () {
                        // do nothing, user tapped cancel
                    }
                }
            ]
        });
        confirm.present();
    };
    MyBuddiesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-my-buddies',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/my-buddies/my-buddies.html"*/'<style type="text/css">\n.toolbar-title.toolbar-title-md {\n 	   font-size: 12px !important;\n}\n.button::after {\n  height: 100px;\n}\n.icon-con {\n  margin-top: 40px;\n      width: 50px;\n    height: 52px;\n}\n.dashboard-text{\n  margin-top: 50px; \n}\n.radio{\n  float: right;\n}\n.top-bar{ \n    box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 5px 1px;\n    /*float: left;*/\n    width: 100%;\n    min-height: 0px;\n    padding: 10px;\n    background: none 0px 0px repeat scroll rgb(246, 64, 65);\n}\n.info-msg{\n  font-size: 13px; \n}\n</style>\n<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-buttons>\n    <ion-title><small style="font-size: 18px;">My Buddies</small></ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content class="pagebg-login" >\n<ion-scroll width="auto" scrollY style="height:600px;width: auto;"> \n    <div class="top-bar">\n        <div class="header-bottom">\n        &nbsp;\n        <a (click)="add_buddy()" class="btn-rounded" ui-sref="app.add-buddies"><img src="assets/imgs/icon-plus.png" alt=""/></a>\n        </div>  \n    </div>\n     <div class="clearfix"></div> \n    <div *ngIf="pageName === 1" class="list list1 info-msg"> \n      Select one or more AYs from the list as your buddies to whom you are monitoring.\n    </div>\n     <div *ngIf="pageName === 2" class="list list1 info-msg">\n      Select your buddy who you are monitoring, select weekly/monthly feedback type and click on "GO" button to enter his/her feedback based on your interaction with him/her in person or on call.\n    </div>\n    \n	  <!-- <div slimScroll width="auto" height="400px"  size="7px" class="list list1" ng-if="dataArr != \'\'" > -->\n      <div class="list list1" ng-if="dataArr != \'\'" >\n		    <div *ngFor="let buddy of dataArr" id="">\n		        <a (click)="changeShowStatus(buddy.user_id,checkOpenDiv)" class="item item-thumbnail-left">\n                <img *ngIf="buddy.gender === \'M\'" src=\'assets/imgs/default-male.png\'>\n		            <img *ngIf="buddy.gender === \'F\'" src=\'assets/imgs/default-female.png\'>\n                <h2>{{buddy.first_name}} {{buddy.last_name}}</h2>\n		            <p ng-if="buddy.city != \'\' && buddy.state != \'\'"><img src="assets/imgs/map-pin.png" width="10px">{{buddy.city}} {{buddy.state}}</p>\n             </a>\n             <span class="trash" (click)="removeBuddyAlert(buddy.user_id)" ><ion-icon name="trash"></ion-icon></span>\n            <div class="checkrow" *ngIf="currentPerson == buddy.user_id" >\n                    <ion-list class="radio-con">\n                        <div class="row responsive-sm">\n                            <div class="col col-50">\n                                <span style="font-size: 16px;" (click)="changeShowStatusRadio(\'feedbackWeekly\')">Weekly Feedback</span> <input class="radio" type="radio" name="feedback" (click)="changeShowStatusRadio(\'feedbackWeekly\')">\n                            </div>\n                            <div class="col col-50">\n                               <span style="font-size: 16px;" (click)="changeShowStatusRadio(\'feedbackMonthly\')">Monthly Feedback</span> <input class="radio" type="radio" name="feedback" (click)="changeShowStatusRadio(\'feedbackMonthly\')">\n                            </div>\n                        </div>\n                    </ion-list>\n                    <div class="row responsive-sm">\n                        <div class="col slide-footer" *ngIf="currentPersonForRadio == \'feedbackWeekly\'"> \n                           \n                            <a  (click)="getPreviousWeek()"><img src="assets/imgs/arrow-left1.png" class="img-marr"></a>\n                            {{ weekStartDate }} to {{ weekEndDate }}\n                           \n                            <a  (click)="getNextWeek()"><img src="assets/imgs/arrow-right2.png" class="img-marl"></a>\n                        </div>\n                        <div class="col slide-footer"  *ngIf="currentPersonForRadio == \'feedbackMonthly\'"> \n                           \n                            <a  (click)="getPreviousMonth()"><img src="assets/imgs/arrow-left1.png" class="img-marr"></a>\n                             {{ monthStartinWords }}, {{ yearStart }}\n                           \n                            <a  (click)="getNextMonth()"><img src="assets/imgs/arrow-right2.png" class="img-marl"></a>\n                        </div>\n                    </div>\n                    <div class="row responsive-sm">\n                        <div class="col slide-footer"> \n                          <a class="btn-small btn-small-relative" (click)="weeklyForm(buddy.user_id)" *ngIf="currentPersonForRadio == \'feedbackWeekly\'">Go</a>\n                          <a class="btn-small btn-small-relative" (click)="monthlyForm(buddy.user_id)" *ngIf="currentPersonForRadio == \'feedbackMonthly\'">Go</a>\n                        </div>\n                    </div>\n            </div>\n		    </div>\n		</div>\n  <!-- </div> -->\n    </ion-scroll>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/my-buddies/my-buddies.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyBuddiesPage);
    return MyBuddiesPage;
}());

//# sourceMappingURL=my-buddies.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewFeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_view_feedback_form_view_feedback_form__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_view_feedback_form_monthly_view_feedback_form_monthly__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the ViewFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewFeedbackPage = /** @class */ (function () {
    function ViewFeedbackPage(navCtrl, navParams, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.week_start_date = "";
        this.base_url = __WEBPACK_IMPORTED_MODULE_2__app_constants__["d" /* wsBaseUrl */];
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.yearStart = (new Date()).getFullYear();
        this.monthStart = (new Date()).getMonth();
        this.monthStartinWords = this.monthNames[this.monthStart];
        var url = this.base_url + 'userServices/getYearWeek';
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var httpBody = "year=" + this.yearStart;
        this.http.post(url, httpBody, { headers: headers })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            _this.yearWeeks = obj.yearWeeks;
            _this.weekID = obj.week.idWeek;
            _this.weekStartDate = obj.week.week_start_date;
            _this.weekEndDate = obj.week.week_end_date;
        }, function (error) {
            console.log(error);
        });
    }
    ViewFeedbackPage.prototype.ionViewDidLoad = function () {
        this.dataArr = this.navParams.get('buddiesArr');
        //console.log('ionViewDidLoad ViewFeedbackPage');
    };
    ViewFeedbackPage.prototype.changeShowStatus = function (user_id, hide) {
        if (this.currentPerson === user_id) {
            if (hide == 1) {
                this.currentPersonForRadio = null;
                this.currentPerson = null;
                return;
            }
            else {
                this.showHide = !this.showHide;
                return;
            }
        }
        this.checkOpenDiv = 1;
        this.currentPersonForRadio = null;
        this.currentPerson = user_id;
    };
    ViewFeedbackPage.prototype.changeShowStatusRadio = function (feedback) {
        if (this.currentPersonForRadio === feedback) {
            //return;
            this.showHide = !this.showHide;
            return;
        }
        this.currentPersonForRadio = feedback;
    };
    ViewFeedbackPage.prototype.getPreviousMonth = function () {
        if (this.monthStart == 0) {
            this.yearStart = this.yearStart - 1;
            this.monthStart = 11;
        }
        else {
            this.monthStart = this.monthStart - 1;
        }
        this.monthStartinWords = this.monthNames[this.monthStart];
    };
    ViewFeedbackPage.prototype.getNextMonth = function () {
        if (this.monthStart == 11) {
            this.yearStart = this.yearStart + 1;
            this.monthStart = 0;
        }
        else {
            this.monthStart = this.monthStart + 1;
        }
        this.monthStartinWords = this.monthNames[this.monthStart];
    };
    ViewFeedbackPage.prototype.getPreviousWeek = function () {
        var _this = this;
        var wsd_arr = this.weekStartDate.split('/');
        var wed_arr = this.weekEndDate.split('/');
        var length = this.yearWeeks.length;
        var previousCount = this.yearWeeks.length;
        this.yearWeeks.forEach(function (item) {
            var sd_arr = item['week_start_date'].split('/');
            var ed_arr = item['week_end_date'].split('/');
            //console.log(sd_arr);
            if ((wsd_arr[0] == ed_arr[0]) && (wsd_arr[1] == ed_arr[1])) {
                if (previousCount == length) {
                    var year = parseInt(wsd_arr[2]) - 1;
                    var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
                    headers.append("Content-Type", "application/x-www-form-urlencoded");
                    var httpBody = "year=" + _this.yearStart;
                    var url = _this.base_url + 'userServices/getYearWeek';
                    _this.http.post(url, httpBody, { headers: headers })
                        .subscribe(function (data) {
                        var responseData = data["_body"];
                        var obj = JSON.parse(responseData);
                        _this.yearWeeks = obj.yearWeeks;
                        _this.getPreviousWeek();
                    }, function (error) {
                        console.log(error);
                    });
                }
                _this.weekID = item['idWeek'];
                _this.weekStartDate = item['week_start_date'];
                _this.weekEndDate = item['week_end_date'];
            }
            previousCount--;
        });
    };
    ViewFeedbackPage.prototype.getNextWeek = function () {
        var _this = this;
        var wsd_arr = this.weekStartDate.split('/');
        var wed_arr = this.weekEndDate.split('/');
        length = this.yearWeeks.length;
        var nextCount = this.yearWeeks.length;
        this.yearWeeks.forEach(function (item) {
            var sd_arr = item['week_start_date'].split('/');
            var ed_arr = item['week_end_date'].split('/');
            if ((wed_arr[0] == sd_arr[0]) && (wed_arr[1] == sd_arr[1])) {
                if (nextCount == 1) {
                    var year = +parseInt(wsd_arr[2]) + +1;
                    var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
                    headers.append("Content-Type", "application/x-www-form-urlencoded");
                    var httpBody = "year=" + _this.yearStart;
                    var url = _this.base_url + 'userServices/getYearWeek';
                    _this.http.post(url, httpBody, { headers: headers })
                        .subscribe(function (data) {
                        var responseData = data["_body"];
                        var obj = JSON.parse(responseData);
                        _this.yearWeeks = obj.yearWeeks;
                        _this.getNextWeek();
                    }, function (error) {
                        console.log(error);
                    });
                }
                _this.weekID = item['idWeek'];
                _this.weekStartDate = item['week_start_date'];
                _this.weekEndDate = item['week_end_date'];
            }
            nextCount--;
        });
    };
    ViewFeedbackPage.prototype.weeklyForm = function (sp_userid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_view_feedback_form_view_feedback_form__["a" /* ViewFeedbackFormPage */], {
            sp_userid: sp_userid,
            idWeek: this.weekID
        });
    };
    ViewFeedbackPage.prototype.monthlyForm = function (sp_userid) {
        var selected_month = this.monthStart + 1;
        var selected_date = this.yearStart + '-' + selected_month + '-01 00:00:00';
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_view_feedback_form_monthly_view_feedback_form_monthly__["a" /* ViewFeedbackFormMonthlyPage */], {
            sp_userid: sp_userid,
            selected_date: selected_date
        });
    };
    ViewFeedbackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-view-feedback',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/view-feedback/view-feedback.html"*/'<style type="text/css">\n.toolbar-title.toolbar-title-md {\n 	   font-size: 12px !important;\n}\n.button::after {\n  height: 100px;\n}\n.icon-con {\n  margin-top: 40px;\n      width: 50px;\n    height: 52px;\n}\n.dashboard-text{\n  margin-top: 50px; \n}\n.radio{\n  float: right;\n}\n.top-bar{\n    box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 5px 1px;\n    /*float: left;*/\n    width: 100%;\n    min-height: 0px;\n    padding: 10px;\n    background: none 0px 0px repeat scroll rgb(246, 64, 65);\n}\n.info-msg{\n  font-size: 13px;\n}\n</style>\n<ion-header>\n  <ion-navbar> \n    <ion-buttons start>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-buttons>\n    <ion-title><small style="font-size: 18px;">View Feedback</small></ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content class="pagebg-login" >\n  <ion-scroll width="auto" scrollY style="height:600px;width: auto;">\n	  <div class="list list1" *ngIf="dataArr != \'\'" >\n\n		    <div *ngFor="let buddy of dataArr" id="">\n		        <a (click)="changeShowStatus(buddy.value.user_id,checkOpenDiv)" class="item item-thumbnail-left">\n                <img *ngIf="buddy.value.gender === \'M\'" src=\'assets/imgs/default-male.png\'>\n		            <img *ngIf="buddy.value.gender === \'F\'" src=\'assets/imgs/default-female.png\'>\n                <h2>{{buddy.value.first_name}} {{buddy.value.last_name}}</h2>\n		            <p ng-if="buddy.value.city != \'\' && buddy.value.state != \'\'"><img src="assets/imgs/map-pin.png" width="10px">{{buddy.value.city}} {{buddy.value.state}}</p>\n             </a>\n            <div class="checkrow" *ngIf="currentPerson == buddy.value.user_id" >\n                    <ion-list class="radio-con">\n                        <div class="row responsive-sm">\n                            <div class="col col-50">\n                                <span style="font-size: 16px;" (click)="changeShowStatusRadio(\'feedbackWeekly\')">Weekly Feedback</span> <input class="radio" type="radio" name="feedback" (click)="changeShowStatusRadio(\'feedbackWeekly\')">\n                            </div>\n                            <div class="col col-50">\n                               <span style="font-size: 16px;" (click)="changeShowStatusRadio(\'feedbackMonthly\')">Monthly Feedback</span> <input class="radio" type="radio" name="feedback" (click)="changeShowStatusRadio(\'feedbackMonthly\')">\n                            </div>\n                        </div>\n                    </ion-list>\n                    <div class="row responsive-sm">\n                        <div class="col slide-footer" *ngIf="currentPersonForRadio == \'feedbackWeekly\'"> \n                           \n                            <a  (click)="getPreviousWeek()"><img src="assets/imgs/arrow-left1.png" class="img-marr"></a>\n                            {{ weekStartDate }} to {{ weekEndDate }}\n                           \n                            <a  (click)="getNextWeek()"><img src="assets/imgs/arrow-right2.png" class="img-marl"></a>\n                        </div>\n                        <div class="col slide-footer"  *ngIf="currentPersonForRadio == \'feedbackMonthly\'"> \n                           \n                            <a  (click)="getPreviousMonth()"><img src="assets/imgs/arrow-left1.png" class="img-marr"></a>\n                             {{ monthStartinWords }}, {{ yearStart }}\n                           \n                            <a  (click)="getNextMonth()"><img src="assets/imgs/arrow-right2.png" class="img-marl"></a>\n                        </div>\n                    </div>\n                    <div class="row responsive-sm">\n                        <div class="col slide-footer"> \n                          <a class="btn-small btn-small-relative" (click)="weeklyForm(buddy.value.user_id)" *ngIf="currentPersonForRadio == \'feedbackWeekly\'">Go</a>\n                          <a class="btn-small btn-small-relative" (click)="monthlyForm(buddy.value.user_id)" *ngIf="currentPersonForRadio == \'feedbackMonthly\'">Go</a>\n                        </div>\n                    </div>\n            </div>\n		    </div>\n\n        <div class="list list1" *ngIf="dataArr == \'\'">\n            <div class="no-box">  <img src=\'assets/imgs/icon-no-comment.png\'><div class="clearfix"> </div>\n            <h3 class="text-center">Feedback Not Avaialable</h3>\n             </div>\n        </div>\n\n		</div>\n</ion-scroll>\n</ion-content> \n\n\n\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/view-feedback/view-feedback.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
    ], ViewFeedbackPage);
    return ViewFeedbackPage;
}());

//# sourceMappingURL=view-feedback.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranierFeedbackSelectDatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tranier_feedback_tranier_feedback__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the TranierFeedbabackSelectDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TranierFeedbackSelectDatePage = /** @class */ (function () {
    function TranierFeedbackSelectDatePage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.base_url = __WEBPACK_IMPORTED_MODULE_2__app_constants__["d" /* wsBaseUrl */];
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.yearStart = (new Date()).getFullYear();
        this.monthStart = (new Date()).getMonth();
        this.monthStartinWords = this.monthNames[this.monthStart];
    }
    TranierFeedbackSelectDatePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TranierFeedbabackSelectDatePage');
    };
    TranierFeedbackSelectDatePage.prototype.getPreviousMonth = function () {
        if (this.monthStart == 0) {
            this.yearStart = this.yearStart - 1;
            this.monthStart = 11;
        }
        else {
            this.monthStart = this.monthStart - 1;
        }
        this.monthStartinWords = this.monthNames[this.monthStart];
    };
    TranierFeedbackSelectDatePage.prototype.getNextMonth = function () {
        if (this.monthStart == 11) {
            this.yearStart = this.yearStart + 1;
            this.monthStart = 0;
        }
        else {
            this.monthStart = this.monthStart + 1;
        }
        this.monthStartinWords = this.monthNames[this.monthStart];
    };
    TranierFeedbackSelectDatePage.prototype.trainerFeedbackForm = function () {
        var selectMonth = this.monthStart + 1;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_tranier_feedback_tranier_feedback__["a" /* TranierFeedbackPage */], {
            FinalmonthStart: selectMonth,
            yearStart: this.yearStart
        });
    };
    TranierFeedbackSelectDatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tranier-feedback-select-date',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/tranier-feedback-select-date/tranier-feedback-select-date.html"*/'<style type="text/css">\n.toolbar-title.toolbar-title-md {\n     font-size: 12px !important;\n}\n.button::after {\n  height: 100px;\n}\n.icon-con {\n  margin-top: 40px;\n      width: 50px;\n    height: 52px;\n}\n.dashboard-text{\n  margin-top: 50px; \n}\n.radio{\n  float: right;\n}\n.top-bar{\n    box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 5px 1px;\n    /*float: left;*/\n    width: 100%;\n    min-height: 0px;\n    padding: 10px;\n    background: none 0px 0px repeat scroll rgb(246, 64, 65);\n}\n.info-msg{\n  font-size: 13px;\n}\n</style>\n<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-buttons>\n    <ion-title><small style="font-size: 18px;">Select Month</small></ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content class="pagebg-login" >\n\n   \n     <div class="clearfix"></div> \n    <ion-scroll width="auto" scrollY style="height:600px;width: auto;">\n    <div  class="list list1" >\n\n        \n            <div class="checkrow"  >\n                    \n                    <div class="row responsive-sm">\n                        \n                        <div class="col slide-footer"> \n                           \n                            <a  (click)="getPreviousMonth()"><img src="assets/imgs/arrow-left1.png" class="img-marr"></a>\n                             {{ monthStartinWords }}, {{ yearStart }}\n                           \n                            <a  (click)="getNextMonth()"><img src="assets/imgs/arrow-right2.png" class="img-marl"></a>\n                        </div>\n                    </div>\n                    <div class="row responsive-sm">\n                        <div class="col slide-footer"> \n                          <a class="btn-small btn-small-relative" (click)="trainerFeedbackForm()">Go</a>\n                        </div>\n                    </div>\n            </div>\n        \n    </div>\n  </ion-scroll>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/tranier-feedback-select-date/tranier-feedback-select-date.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
    ], TranierFeedbackSelectDatePage);
    return TranierFeedbackSelectDatePage;
}());

//# sourceMappingURL=tranier-feedback-select-date.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SplashPage = /** @class */ (function () {
    function SplashPage(navCtrl, navParams, viewCtrl, splashScreen) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.splashScreen = splashScreen;
    }
    SplashPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SplashPage');
    };
    SplashPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.splashScreen.hide();
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 4000);
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-splash',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/splash/splash.html"*/'<!--\n  Generated template for the SplashPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Splash</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n \n   YPV APPLICATION  WITH IONIC 3 AND ANGULAR 4\n \n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/splash/splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(236);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_splash_splash__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_my_buddies_my_buddies__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular_io_slimscroll__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular_io_slimscroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_angular_io_slimscroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_my_buddy_weekly_my_buddy_weekly__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_my_buddy_monthly_my_buddy_monthly__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_view_feedback_view_feedback__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_tranier_feedback_select_date_tranier_feedback_select_date__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_tranier_feedback_tranier_feedback__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_view_feedback_form_view_feedback_form__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_view_feedback_form_monthly_view_feedback_form_monthly__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_add_buddy_add_buddy__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_login_login_module__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_forgot_password_forgot_password__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_splash_splash__["a" /* SplashPage */],
                //LoginPage,
                __WEBPACK_IMPORTED_MODULE_8__pages_my_buddies_my_buddies__["a" /* MyBuddiesPage */],
                __WEBPACK_IMPORTED_MODULE_12_angular_io_slimscroll__["SlimScroll"],
                __WEBPACK_IMPORTED_MODULE_13__pages_my_buddy_weekly_my_buddy_weekly__["a" /* MyBuddyWeeklyPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_my_buddy_monthly_my_buddy_monthly__["a" /* MyBuddyMonthlyPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_view_feedback_view_feedback__["a" /* ViewFeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_tranier_feedback_select_date_tranier_feedback_select_date__["a" /* TranierFeedbackSelectDatePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_tranier_feedback_tranier_feedback__["a" /* TranierFeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_view_feedback_form_view_feedback_form__["a" /* ViewFeedbackFormPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_view_feedback_form_monthly_view_feedback_form_monthly__["a" /* ViewFeedbackFormMonthlyPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_add_buddy_add_buddy__["a" /* AddBuddyPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/add-buddy/add-buddy.module#AddBuddyPageModule', name: 'AddBuddyPage', segment: 'add-buddy', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/change-password/change-password.module#ChangePasswordPageModule', name: 'ChangePasswordPage', segment: 'change-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordPageModule', name: 'ForgotPasswordPage', segment: 'forgot-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/logout/logout.module#LogoutPageModule', name: 'LogoutPage', segment: 'logout', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/special/special.module#SpecialPageModule', name: 'SpecialPage', segment: 'special', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/splash/splash.module#SplashPageModule', name: 'SplashPage', segment: 'splash', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tranier-feedback-select-date/tranier-feedback-select-date.module#TranierFeedbackSelectDatePageModule', name: 'TranierFeedbackSelectDatePage', segment: 'tranier-feedback-select-date', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/view-feedback-form-monthly/view-feedback-form-monthly.module#ViewFeedbackFormMonthlyPageModule', name: 'ViewFeedbackFormMonthlyPage', segment: 'view-feedback-form-monthly', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/view-feedback/view-feedback.module#ViewFeedbackPageModule', name: 'ViewFeedbackPage', segment: 'view-feedback', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/my-buddies/my-buddies.module#MyBuddiesPageModule', name: 'MyBuddiesPage', segment: 'my-buddies', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/my-buddy-monthly/my-buddy-monthly.module#MyBuddyMonthlyPageModule', name: 'MyBuddyMonthlyPage', segment: 'my-buddy-monthly', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tranier-feedback/tranier-feedback.module#TranierFeedbackPageModule', name: 'TranierFeedbackPage', segment: 'tranier-feedback', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/view-feedback-form/view-feedback-form.module#ViewFeedbackFormPageModule', name: 'ViewFeedbackFormPage', segment: 'view-feedback-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/my-buddy-weekly/my-buddy-weekly.module#MyBuddyWeeklyPageModule', name: 'MyBuddyWeeklyPage', segment: 'my-buddy-weekly', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_21__pages_login_login_module__["LoginPageModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_my_buddies_my_buddies__["a" /* MyBuddiesPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_my_buddy_weekly_my_buddy_weekly__["a" /* MyBuddyWeeklyPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_my_buddy_monthly_my_buddy_monthly__["a" /* MyBuddyMonthlyPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_view_feedback_view_feedback__["a" /* ViewFeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_tranier_feedback_select_date_tranier_feedback_select_date__["a" /* TranierFeedbackSelectDatePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_tranier_feedback_tranier_feedback__["a" /* TranierFeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_view_feedback_form_view_feedback_form__["a" /* ViewFeedbackFormPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_view_feedback_form_monthly_view_feedback_form_monthly__["a" /* ViewFeedbackFormMonthlyPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_add_buddy_add_buddy__["a" /* AddBuddyPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, modalCtrl, alertCtrl) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.onlineOffline = navigator.onLine;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            //statusBar.show();
            // let splash = modalCtrl.create(SplashPage);
            //splash.present();
            //splashScreen.show();
        });
        if (!navigator.onLine) {
            //Do task when no internet connection
        }
        window.addEventListener('offline', function () {
            var alert = _this.alertCtrl.create({
                title: 'Connection Failed !',
                subTitle: 'There may be a problem in your internet connection. Please try again ! ',
                buttons: [{
                        text: ('Okay')
                    }]
            });
            alert.present();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_forgot_password_forgot_password__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = /** @class */ (function () {
    function LoginPage(platform, navCtrl, navParams, formBuilder, loadingCtrl, http, menu) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.menu = menu;
        this.LoginForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            pwd: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
        this.device_id = __WEBPACK_IMPORTED_MODULE_3__app_constants__["a" /* device_id */];
        this.role_id = __WEBPACK_IMPORTED_MODULE_3__app_constants__["b" /* role_id */];
        this.base_url = __WEBPACK_IMPORTED_MODULE_3__app_constants__["d" /* wsBaseUrl */];
        this.version_name = __WEBPACK_IMPORTED_MODULE_3__app_constants__["c" /* versionName */];
        if (platform.is('android')) {
            this.device_type = 'android';
        }
        if (platform.is('ios')) {
            this.device_type = 'ios';
        }
        //console.log(this.version_name);
    }
    LoginPage.prototype.ionViewDidLoad = function () { };
    LoginPage.prototype.loginFunction = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var httpBody = "device_id=" + this.device_id + "&role_id=" + this.role_id + "&device_type=" + this.device_type + "& username=" + this.LoginForm.value.email + "&password=" + this.LoginForm.value.pwd;
        //let httpBody = "device_id="+this.device_id+"&role_id="+this.role_id+"&device_type="+this.device_type+"& username=trainer@mailinator.com&password=123456";
        var url = this.base_url + 'userServices/login';
        this.http.post(url, httpBody, { headers: headers })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            if (obj.response == 'F') {
                loading.dismiss();
                _this.LoginerrorMsg = obj.message;
            }
            else {
                var auth_token = '';
                var is_spritual_trainer = '';
                localStorage.setItem('auth_token', obj.data.access_token);
                localStorage.setItem('is_spritual_trainer', obj.data.is_spritual_trainer);
                localStorage.setItem('version_name', _this.version_name);
                localStorage.setItem('device_type', _this.device_type);
                localStorage.setItem('current_pwd', _this.LoginForm.value.pwd);
                loading.dismiss();
                _this.navCtrl.setRoot('MenuPage');
            }
        }, function (error) {
            console.log(error);
        });
    };
    LoginPage.prototype.forgot_passwd = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/login/login.html"*/'<style type="text/css">   \n.has-error {\n    font-size: 13px !important;\n    color: red !important;\n}\n</style>\n<ion-content class="has-header logo-header" scroll="true"> \n\n	<!-- Logo start-->\n        <div class="logo-bar-header">\n            <div class="logo"> <img class="" src="assets/imgs/logo.png"/></div>\n            <div class="clearfix"></div>\n\n            <h1 class="title">Spiritual Buddy Login</h1>\n        </div> \n        <!-- Logo end --> \n\n        <form  [formGroup]="LoginForm" class="list login-form form1" (ngSubmit)="loginFunction()"> \n            <input name="role_id" value="{{this.role_id}}" type="hidden" />\n            <input name="device_id" value="{{this.device_id}}" type="hidden" />\n            \n\n            <div class="list">\n                <label class="item item-input item-stacked-label"> <span ng-class="loginForm.username.$touched && (loginForm.username.$error.required || loginForm.username.$error.email || loginForm.username.$error.minlength || loginForm.username.$error.maxlength) ? \'input-label has-error\' : \'input-label\'">Email</span>\n                    <input type="email" placeholder="" formControlName="email" ng-model="loginFormData.username" ng-minlength="1" ng-maxlength="255" required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                </label>\n\n                <label class="item item-input item-stacked-label"> <span ng-class="loginForm.password.$touched && (loginForm.password.$error.required || loginForm.password.$error.minlength || loginForm.password.$error.maxlength) ? \'input-label has-error\' : \'input-label\'">Password</span>\n                    <input type="password" formControlName="pwd" placeholder=""  ng-model="loginFormData.password" ng-minlength="5" ng-maxlength="11" required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                </label>\n                <div class="has-error">{{ this.LoginerrorMsg }} </div>\n            </div> \n             \n            <button [disabled]="!LoginForm.valid" type="submit" class="button button-stable button-block btn-login">LOGIN</button>\n            \n           <h4 class="text-center form-footer"><a class="link-1 forgotPassword" (click)="forgot_passwd()"  >Forgot password?</a></h4>\n        </form>\n\n</ion-content>\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[215]);
//# sourceMappingURL=main.js.map