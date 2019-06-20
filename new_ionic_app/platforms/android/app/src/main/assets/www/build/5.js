webpackJsonp([5],{

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPageModule", function() { return ChangePasswordPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__change_password__ = __webpack_require__(315);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChangePasswordPageModule = /** @class */ (function () {
    function ChangePasswordPageModule() {
    }
    ChangePasswordPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */]),
            ],
        })
    ], ChangePasswordPageModule);
    return ChangePasswordPageModule;
}());

//# sourceMappingURL=change-password.module.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
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
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(navCtrl, navParams, formBuilder, http, loadingCtrl, menu, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.changePwdForm = formBuilder.group({
            new_password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            confirm_new_password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
        this.device_id = __WEBPACK_IMPORTED_MODULE_7__app_constants__["a" /* device_id */];
        this.role_id = __WEBPACK_IMPORTED_MODULE_7__app_constants__["b" /* role_id */];
        this.base_url = __WEBPACK_IMPORTED_MODULE_7__app_constants__["d" /* wsBaseUrl */];
        this.version_name = __WEBPACK_IMPORTED_MODULE_7__app_constants__["c" /* versionName */];
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePasswordPage');
    };
    ChangePasswordPage.prototype.doChangePwd = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        var new_password = this.changePwdForm.value.new_password;
        var confirm_new_password = this.changePwdForm.value.confirm_new_password;
        var url = this.base_url + 'userServices/changePassword';
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var httpBody = "access_token=" + localStorage.getItem('auth_token') + "&current_password=IGNORE" + "&role_id=" + this.role_id + "&device_type=" + localStorage.getItem('device_type') + "&new_password=" + new_password + "&device_id=" + this.device_id + "&confirm_new_password=" + confirm_new_password;
        this.http.post(url, httpBody, {
            headers: headers
        })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            if (obj.response == 'S') {
                loading.dismiss();
                _this.showSuccessAlert();
                _this.dataFound = true;
            }
            else {
                _this.dataFound = false;
            }
        }, function (error) {
            console.log(error);
        });
    };
    ChangePasswordPage.prototype.showSuccessAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Password Change Successfully.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    ChangePasswordPage.prototype.showErrorAlert = function () {
        var basicAlert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Error in network, Please try again later!.',
            buttons: ['OK']
        });
        basicAlert.present();
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-change-password',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/change-password/change-password.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-buttons>\n    <ion-title><small style="font-size: 18px;">Change Password</small></ion-title> \n  </ion-navbar>\n</ion-header>\n \n<ion-content padding>\n        <form class="list form1" name="changePwdForm" [formGroup]="changePwdForm" novalidate="" (ngSubmit)="doChangePwd()">\n                    <div class="list">\n                        <label class="item item-input item-stacked-label"> <span >New Password</span>\n                            <input type="password" placeholder="" formControlName="new_password" ng-minlength="5" ng-maxlength="11" required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                        </label>\n\n                        <label class="item item-input item-stacked-label"> <span >Confirm Password</span>\n                            <input type="password" placeholder="" formControlName="confirm_new_password"  ng-minlength="5" ng-maxlength="11" required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\n                        </label>\n\n                        <div class="success-msg">{{ flash_success }}</div>\n                        <div class="has-error">{{ flash_failure }} </div>\n                    </div>\n\n                    <button [disabled]="!changePwdForm.valid" type="submit" class="button button-stable  button-block btn-login">Change Password</button>\n        </form>\n</ion-content>'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/change-password/change-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ })

});
//# sourceMappingURL=5.js.map