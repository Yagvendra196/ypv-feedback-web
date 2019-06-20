webpackJsonp([4],{

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(316);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_my_buddies_my_buddies__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_view_feedback_view_feedback__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tranier_feedback_select_date_tranier_feedback_select_date__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, http, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.device_id = __WEBPACK_IMPORTED_MODULE_3__app_constants__["a" /* device_id */];
        this.role_id = __WEBPACK_IMPORTED_MODULE_3__app_constants__["b" /* role_id */];
        this.base_url = __WEBPACK_IMPORTED_MODULE_3__app_constants__["d" /* wsBaseUrl */];
        this.version_name = __WEBPACK_IMPORTED_MODULE_3__app_constants__["c" /* versionName */];
        console.log(localStorage.getItem('is_spritual_trainer'));
        if (localStorage.getItem('is_spritual_trainer') == '0') {
            this.is_spritual_trainer = false;
        }
        else {
            this.is_spritual_trainer = true;
        }
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    /*  getBuddiesList(pageName){
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
                    if(obj.response == 'F'){
                        this.LoginerrorMsg = obj.message;
                    } else {
                  loading.dismiss();
                        this.Buddies_data = obj.data;
                  console.log(obj.data);
                  this.navCtrl.push(MyBuddiesPage,{
                    buddiesArr:this.Buddies_data,
                    pageName:pageName
                  });
                        }
                }, error => {
                    console.log(error);
                }
        );
      }*/
    HomePage.prototype.getBuddiesList = function (pageName) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_my_buddies_my_buddies__["a" /* MyBuddiesPage */], {
            pageName: pageName
        });
    };
    HomePage.prototype.viewFeedbackBuddiesList = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var httpBody = "access_token=" + localStorage.getItem('auth_token');
        var url = this.base_url + 'userServices/getFeedbackBuddies';
        this.http.post(url, httpBody, { headers: headers })
            .subscribe(function (data) {
            var responseData = data["_body"];
            var obj = JSON.parse(responseData);
            console.log(_this.version_name);
            if (_this.version_name == obj.version_name) {
                if (obj.response == 'F') {
                    _this.LoginerrorMsg = obj.message;
                }
                else {
                    loading.dismiss();
                    _this.feedbackBuddies_data = obj.data;
                    var mapped = Object.entries(obj.data).map(function (_a) {
                        var sp_id = _a[0], value = _a[1];
                        return ({ sp_id: sp_id, value: value });
                    });
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_view_feedback_view_feedback__["a" /* ViewFeedbackPage */], {
                        buddiesArr: mapped,
                    });
                }
            }
            else {
                loading.dismiss();
                _this.showErrorAlert();
            }
        }, function (error) {
            console.log(error);
        });
    };
    HomePage.prototype.trainerFeedbackForm = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_tranier_feedback_select_date_tranier_feedback_select_date__["a" /* TranierFeedbackSelectDatePage */]);
    };
    HomePage.prototype.showErrorAlert = function () {
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
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/opt/lampp/htdocs/ionic3/src/pages/home/home.html"*/'<style type="text/css">\n	.toolbar-title.toolbar-title-md {\n 	   font-size: 12px !important;\n}\n.button::after {\n  height: 100px;\n}\n.icon-con {\n  margin-top: 40px;\n      width: 50px;\n    height: 52px;\n}\n.dashboard-text{\n  margin-top: 50px;\n}\n@media (max-width: 749px){\n  .main-con {\n      width: 100%;\n      height: 100%;\n      overflow-y: scroll !important;\n  }\n}\n</style>\n<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-buttons>\n    <ion-title><small style="font-size: 18px;">Dashboard</small></ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content class="pagebg-login">\n<!-- <ion-scroll width="auto" scrollY style="height:100vh;width: auto;"> -->\n  <div class="main-con">\n     <button class="button button-block btn-larg dashboard-btn" (click)="getBuddiesList(1)" >\n                  <span class="icon-con">\n                    <img src="assets/imgs/icon-buddy.png"/>\n                  </span>\n                  <br><br><br><br><br><br>\n                  <span class="dashboard-text">My Buddies</span>\n     </button>\n     <button class="button button-block btn-larg dashboard-btn" (click)="getBuddiesList(2)">\n                  <span class="icon-con">\n                    <img src="assets/imgs/give-feedback.png"/>\n                  </span>\n                  <br><br><br><br><br><br>\n                  <span class="dashboard-text">Give Feedback</span>\n     </button>\n     <button class="button button-block btn-larg dashboard-btn" (click)="viewFeedbackBuddiesList()">\n                  <span class="icon-con">\n                    <img src="assets/imgs/icon-feedback.png"/>\n                  </span>\n                  <br><br><br><br><br><br>\n                  <span class="dashboard-text">View Feedback</span>\n     </button>\n     <button class="button button-block btn-larg dashboard-btn" *ngIf="is_spritual_trainer" (click)="trainerFeedbackForm()" >\n                  <span class="icon-con">\n                    <img src="assets/imgs/book.png"/>\n                  </span>\n                  <br><br><br><br><br><br>\n                  <span class="dashboard-text">Trainer Feedback</span>\n     </button>\n  </div>\n<!-- </ion-scroll>\n --></ion-content>\n\n\n\n'/*ion-inline-end:"/opt/lampp/htdocs/ionic3/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=4.js.map