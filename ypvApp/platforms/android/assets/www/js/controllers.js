angular.module('starter.controllers', ['ionic','ngCordova.plugins.inAppBrowser'])

        .controller('AppCtrl', function ($scope, $timeout, $ionicModal, $ionicLoading, $ionicPopup, $state, $http, $filter) {




            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) { });

            ionic.Platform.ready(function () { 
                // will execute when device is ready, or immediately if the device is already ready.
            });

            var deviceInformation = ionic.Platform.device();

            var isWebView = ionic.Platform.isWebView();
            var isIPad = ionic.Platform.isIPad();
            var isIOS = ionic.Platform.isIOS();
            var isAndroid = ionic.Platform.isAndroid();
            var isWindowsPhone = ionic.Platform.isWindowsPhone();

            var currentPlatform = ionic.Platform.platform();
            var currentPlatformVersion = ionic.Platform.version();






            //$scope.versionName = '1.9';
            $scope.role_id = '3';
            $scope.device_id = 'HT9CTP820988';
            $scope.device_type = currentPlatform;
            $scope.wsBasePath = wsBasePath;
            $scope.monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            $scope.yearStart = (new Date()).getFullYear();
            $scope.monthStart = (new Date()).getMonth();
            $scope.monthStartinWords = $scope.monthNames[ $scope.monthStart ];

            // Form data for the login modal
            //$scope.loginData = {};

            // Create the login modal that we will use later
            /*$ionicModal.fromTemplateUrl('templates/login.html', {
             scope: $scope
             }).then(function (modal) {
             $scope.modal = modal;
             });*/

            // Triggered in the login modal to close it
            /*$scope.closeLogin = function () {
                $scope.modal.hide();
            };*/

            // Open the login modal
            /*$scope.login = function () {
                $scope.modal.show();
            };*/

            // Triggered in the login modal to close it
            /*$scope.rowItem = function () {
                $('#row1').toggleClass('right-tick');
                $('#rowItems').toggleClass('alert-box');
            };*/

            /*
             // Perform the login action when the user submits the login form
             $scope.doLogin = function() {
             console.log('Doing login', $scope.loginData);
             
             // Simulate a login delay. Remove this and replace with your login
             // code if using a login system
             $timeout(function() {
             $scope.closeLogin();
             }, 1000);
             };
             */

            $scope.init = function () {
                var year = $filter('date')(new Date(), 'yyyy');
                var url = wsBaseUrl + 'userServices/getYearWeek';

                $http.post(url, {'year': year}).success(function (response)
                {
                    $scope.yearWeeks = response.yearWeeks;
                    $scope.weekID = response.week.idWeek;
                    $scope.weekStartDate = response.week.week_start_date;
                    $scope.weekEndDate = response.week.week_end_date;
                });
            }

            $scope.getPreviousMonth = function () {
                if ($scope.monthStart==0) {
                    $scope.yearStart = $scope.yearStart-1;
                    $scope.monthStart = 11;
                } else {
                    $scope.monthStart = $scope.monthStart-1;
                }
                $scope.monthStartinWords = $scope.monthNames[ $scope.monthStart ];
            }

            $scope.getNextMonth = function () {
                if ($scope.monthStart==11) {
                    $scope.yearStart = $scope.yearStart+1;
                    $scope.monthStart = 0;
                } else {
                    $scope.monthStart = $scope.monthStart+1;
                }
                $scope.monthStartinWords = $scope.monthNames[ $scope.monthStart ];
            }



            $scope.getPreviousWeek = function () {
                var wsd_arr = $scope.weekStartDate.split('/');
                var wed_arr = $scope.weekEndDate.split('/');
                var length = $scope.yearWeeks.length;
                var previousCount = $scope.yearWeeks.length;

                angular.forEach($scope.yearWeeks, function (value, key) {
                    var sd_arr = value.week_start_date.split('/');
                    var ed_arr = value.week_end_date.split('/');
                    if ( (wsd_arr[0] == ed_arr[0]) && (wsd_arr[1] == ed_arr[1]) ) {

                        if (previousCount == length) {
                            $ionicLoading.show({ templateUrl:"templates/loading.html" });
                            var year = wsd_arr[2] - 1;
                            var url = wsBaseUrl + 'userServices/getYearWeek';

                            $http.post(url, {'year': year}).success(function (response)
                            {
                                $timeout(function () {
                                    $ionicLoading.hide();
                                    $scope.yearWeeks = response.yearWeeks;
                                    $scope.getPreviousWeek();
                                }, 1000);
                            });
                        }
                        $scope.weekID = value.idWeek;
                        $scope.weekStartDate = value.week_start_date;
                        $scope.weekEndDate = value.week_end_date;
                    }
                    previousCount--;
                });
            }

            $scope.getNextWeek = function () {
                var wsd_arr = $scope.weekStartDate.split('/');
                var wed_arr = $scope.weekEndDate.split('/');
                var length = $scope.yearWeeks.length;
                var nextCount = $scope.yearWeeks.length;

                angular.forEach($scope.yearWeeks, function (value, key) {
                    var sd_arr = value.week_start_date.split('/');
                    var ed_arr = value.week_end_date.split('/');

                    if ((wed_arr[0] == sd_arr[0]) && (wed_arr[1] == sd_arr[1])) {

                        if (nextCount == 1) {
                            $ionicLoading.show({ templateUrl:"templates/loading.html" });
                            var year = +wsd_arr[2] + +1;
                            var url = wsBaseUrl + 'userServices/getYearWeek';

                            $http.post(url, {'year': year}).success(function (response)
                            {
                                $timeout(function () {
                                    $ionicLoading.hide();
                                    $scope.yearWeeks = response.yearWeeks;
                                    $scope.getNextWeek();
                                }, 1000);
                            });
                        }
                        ;
                        $scope.weekID = value.idWeek;
                        $scope.weekStartDate = value.week_start_date;
                        $scope.weekEndDate = value.week_end_date;
                    }
                    ;
                    nextCount--;
                });
            }
            /*
            $scope.goToMyBuddies = function () {
                 $state.go('app.my-buddies', { context: 'mybuddies' });
            }
            $scope.goToGiveFeedback = function () {
                $state.go('app.my-buddies', { context: 'givefeedback' });
            }
            */
        })

        .controller('loginCtrl', function ($rootScope,$scope, $timeout, $ionicLoading, $ionicPopup, $state, $http,$cordovaInAppBrowser) {

            $scope.flash_failure = '';

            $scope.loginFormData = {
                role_id: $scope.role_id,
                device_id: $scope.device_id,
                device_type: $scope.device_type
            }

            $scope.doLogin = function (loginForm) {
                if (loginForm.$valid)
                {
                    $ionicLoading.show({ templateUrl:"templates/loading.html" });

                    var url = wsBaseUrl + 'userServices/login';
                    $http({
                        method: 'POST',
                        data: $scope.loginFormData,
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(function (response) {

                        $timeout(function () {
                            $ionicLoading.hide();
                            if (response.data.response == 'S') {
                                $scope.flash_failure = '';
                                window.localStorage.setItem('auth_token', response.data.data.access_token);
                                window.localStorage.setItem('is_spritual_trainer', response.data.data.is_spritual_trainer);
                                $state.go('app.dashboard');
                            }
                            if (response.data.response == 'F') {

                                if (response.data.errors != '')
                                {
                                    var allErrors = '';

                                    for ( key in response.data.errors ) {
                                        allErrors += response.data.errors[key] + "\n";
                                    }

                                    $scope.flash_failure = allErrors;

                                } else {
                                    $scope.flash_failure = response.data.message;
                                }

                                $state.go('login');
                            }
                        }, 1000);
                    });
                } else {
                    return false;
                }
            };






            //open forgotpassword in new browser window

            var options = {
                  location: 'yes',
                  clearcache: 'yes',
                  toolbar: 'no'
                };


              (document.getElementsByClassName('forgotPassword')[0]).addEventListener("click", function () {

                var url = this.getAttribute("href");
                var target = this.getAttribute("target");

                
                $cordovaInAppBrowser.open(url, target, options)
                  .then(function(event) {
                    // success
                  })
                  .catch(function(event) {
                    // error
                  });
                

                //$cordovaInAppBrowser.close();
                
              }, false);

              $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){

              });

              $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
                
                // insert CSS via code / file
                $cordovaInAppBrowser.insertCSS({
                  code: 'body {background-color:white;}'
                });

                /*
                // insert Javascript via code / file
                $cordovaInAppBrowser.executeScript({
                  file: 'script.js'
                });
                */
              });

              $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){

              });

              $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){

              });
            //end forgotpassword

            // A confirm dialog
            /*$scope.showConfirm = function () {
                var confirmPopup = $ionicPopup.alert({
                    title: 'Reset Password',
                    template: 'We have sent you an email to reset your password, please check your mailbox.'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        console.log('You are sure');
                        $state.go('login');
                    } else {
                        console.log('You are not sure');
                    }
                });
            };*/
        })

        .controller('dashboardCtrl', function ($scope, $ionicPopup, $state) {
            $scope.is_spritual_trainer = window.localStorage.getItem('is_spritual_trainer');
         })

        .controller('menuCtrl', function ($scope, $ionicPopup, $state) { })

        .controller('logoutCtrl', function ($state, $http) {

            var url = wsBaseUrl + 'userServices/logout';

            $http.post(url, {'access_token': window.localStorage.getItem('auth_token')}).success(function (res)
            {
                window.localStorage.removeItem('auth_token');
                $state.go('login');
                //$state.go('login', {}, {reload: true, inherit: false});
            });
        })

        .controller('myBuddiesCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $filter,$stateParams,$cordovaInAppBrowser) {


            $scope.removeBuddy = function (buddy) {

                 var confirmPopup = $ionicPopup.confirm({ title: 'Remove buddy', 
                                                          template: 'Are you sure, You want remove to ' + name + '?'
                                                        });
                     confirmPopup.then(function(res) {
                       if(res) {

                            var url = wsBaseUrl + 'userServices/removeBuddy';
                            var data = {'access_token': window.localStorage.getItem('auth_token'), 'buddy_user_id' : buddy.user_id };
                            $http.post(url, data).success(function (res)
                            {
                                $timeout(function () {
                                    if (res.response == 'S') {   
                                        angular.element( document.querySelector( '#user'+buddy.user_id ) ).remove();
                                    }
                                }, 500);
                            });

                       } 
                     });
            }
            

            $scope.init = function () {
            $scope.context = $stateParams.context;

                $ionicLoading.show({ templateUrl:"templates/loading.html" });

                var url = wsBaseUrl + 'userServices/getMyBuddies';

                $http.post(url, {'access_token': window.localStorage.getItem('auth_token'),'version_name':$scope.versionName}).success(function (response)
                {
                    
                     apiVersionName = response.version_name;
                     if(versionName != apiVersionName){
                        console.log(apiVersionName);
                        $ionicLoading.show({ templateUrl:"templates/new_version.html" });
                        return false;
                    }

                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.myBuddies = response.data;
                    }, 1000);
                });
            }
        })

        .controller('feedbackBuddiesCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $filter) {
            $scope.showMessage = false;
            $scope.init = function () {
                $ionicLoading.show({ templateUrl:"templates/loading.html" });

                var url = wsBaseUrl + 'userServices/getFeedbackBuddies';

                $http.post(url, {'access_token': window.localStorage.getItem('auth_token')}).success(function (response)
                {
                     apiVersionName = response.version_name;
                     if(versionName != apiVersionName){
                        $ionicLoading.show({ templateUrl:"templates/new_version.html" });
                        return false;
                    }

                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.feedbackBuddies = response.data;
                        $scope.showMessage = (response.data.length > 0) ? true : false;
                    }, 1000);
                });
            }
        })

        .controller('addBuddiesCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http) {

            $scope.allBuddies = '';

            $scope.filterBuddy = function (keywords) {
                if (keywords=='') {
                    $scope.addBuddies = $scope.allBuddies;
                } 
            }

            $scope.searchBuddy = function (keywords) {
                 $ionicLoading.show({ templateUrl:"templates/loading.html" });
                var url = wsBaseUrl + 'userServices/searchBuddy';
                var data = {'access_token': window.localStorage.getItem('auth_token'), 'keywords' : keywords };
                $http.post(url, data).success(function (res) {
                    $timeout(function () {
                        if (res.response == 'S') {   
                            $ionicLoading.hide();
                            $scope.addBuddies = res.data;
                        }
                    }, 500);
                });

                if (keywords=='') {
                    $scope.addBuddies = $scope.allBuddies;
                } 
                
            }
                

            $scope.init = function () {
                $ionicLoading.show({ templateUrl:"templates/loading.html" });

                var url = wsBaseUrl + 'userServices/getAddBuddies';
                $http.post(url, {'access_token': window.localStorage.getItem('auth_token')}).success(function (response)
                {
                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.addBuddies = response.data;
                        $scope.allBuddies = response.data;
                    }, 500);

                });
            }

            $scope.addBuddy = function (user_id) {
                $ionicLoading.show({ templateUrl:"templates/loading.html" });

                var url = wsBaseUrl + 'userServices/setAddBuddies';
                $http.post(url, {'access_token': window.localStorage.getItem('auth_token'), 'user_id': user_id}).success(function (data, status, headers, config) {
                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.init();
                    }, 500);

                });
            }
        })

        .controller('feedbackWeeklyCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $stateParams) {

            
            $scope.init = function () { 
                $ionicLoading.show({ templateUrl:"templates/loading.html" });



                var url = wsBaseUrl + 'userServices/feedback_fields';
                $http.post(url, {'feedback_type': 1, 'access_token': window.localStorage.getItem('auth_token'), 'user_id': $stateParams.id}).success(function (response)
                {
                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.feedback_fields = response.data;
                        $scope.user_details = response.info;

                        $scope.idWeek = $stateParams.idWeek;
                        var url = wsBaseUrl + 'userServices/view_feedback_fields';
                        $http.post(url, {'feedback_type': 'Weekly', 'access_token': window.localStorage.getItem('auth_token'), 'idWeek': $scope.idWeek, 'spiritual_buddie_user_id': $stateParams.id, 'purpose': 'edit', 'use_date_filter':1 }).success(function (res)
                        {
                           if (res.response == 'S') {   
                                    angular.forEach(res.data, function (value, key) {
                                        var k = 'feedback_field_'+value.feedback_field_id;
                                        $scope.feedbackWeeklyFormData[k] = value.user_feedback_field_value;
                                    });
                            }
                        });


                    }, 1000);
                });
                
            }

            $scope.feedbackWeeklyFormData = {
                user_id: $stateParams.id,
                idWeek: $stateParams.idWeek,
                feedback_type: 'Weekly',
                access_token: window.localStorage.getItem('auth_token')
            }

            $scope.validateFeedbackWeekly = function (feedbackWeeklyForm) {
                 $scope.flash_failure = '';

                if (feedbackWeeklyForm.$valid)
                {
                    $ionicLoading.show({ templateUrl:"templates/loading.html" });

                    var url = wsBaseUrl + 'userServices/feedbackWeekly';
                    $http({
                        method: 'POST',
                        data: $scope.feedbackWeeklyFormData,
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(function (response) {

                        $timeout(function () {
                            $ionicLoading.hide();
                            if (response.data.response == 'S') {

                                $scope.flash_failure = response.data.message;
                                $state.go('app.my-buddies');
                                /*var alertPopup = $ionicPopup.alert({
                                    title: '',
                                    template: response.data.message,
                                    okType: 'button button-stable button-block btn-login'
                                });
                                alertPopup.then(function (res) {
                                    $state.go('app.my-buddies');
                                });*/
                            }
                            if (response.data.response == 'F') {

                                $scope.flash_failure = response.data.message;
                                $state.go('login');
                                /*var alertPopup = $ionicPopup.alert({
                                    title: 'Error',
                                    template: response.data.message,
                                    okType: 'button button-stable button-block btn-login'
                                });
                                alertPopup.then(function (res) {
                                    $state.go('login');
                                });*/
                            }
                        }, 1000);
                    });
                } else {
                    return false;
                }
            };
        })

        .controller('viewFeedbackWeeklyCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $stateParams) {

            $scope.dataFound = false;

            $scope.feedbackWeeklyFormData = {
                idWeek: $stateParams.idWeek,
                feedback_type: 'Weekly',
                access_token: window.localStorage.getItem('auth_token')
            }

            $scope.init = function () {
                $scope.idWeek = $stateParams.idWeek;
                $scope.spiritualBuddieUserID = $stateParams.id;
                $ionicLoading.show({ templateUrl:"templates/loading.html" });

                var url = wsBaseUrl + 'userServices/view_feedback_fields';

                $http.post(url, {'feedback_type': 'Weekly', 'access_token': window.localStorage.getItem('auth_token'), 'idWeek': $scope.idWeek, 'spiritual_buddie_user_id': $scope.spiritualBuddieUserID, 'purpose': 'view', 'use_date_filter':1}).success(function (res)
                {
                    $timeout(function () {
                        $ionicLoading.hide();
                        if (res.response == 'S') {
                            $scope.feedback_fields = res.data;
                            angular.forEach(res.data, function (value, key) {
                                var k = 'feedback_field_'+value.feedback_field_id;
                                $scope.feedbackWeeklyFormData[k] = value.user_feedback_field_value;
                                if (value.user_feedback_field_value!='') {
                                    $scope.dataFound = true;
                                }
                            });

                        }
                        if (res.response == 'F') {
                            $scope.message = res.message;
                        }
                    }, 500);
                });
            }
        })

        .controller('feedbackMonthlyCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $stateParams, $filter) {


            $scope.selected_date = $stateParams.year+'-'+ (parseInt($stateParams.month)+1) +'-01 00:00:00';

            $scope.init = function () {
                $ionicLoading.show({ templateUrl:"templates/loading.html" });

                var url = wsBaseUrl + 'userServices/feedback_fields';

                $http.post(url, {'feedback_type': 2, 'access_token': window.localStorage.getItem('auth_token'), 'user_id': $stateParams.id}).success(function (response)
                {
                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.feedback_fields = response.data;
                        $scope.user_details = response.info;

                        $scope.spiritualBuddieUserID = $stateParams.id;
                        var url = wsBaseUrl + 'userServices/view_feedback_fields';
                        $http.post(url, {'feedback_type': 'Monthly', 'access_token': window.localStorage.getItem('auth_token'), 'selected_date': $scope.selected_date, 'spiritual_buddie_user_id': $scope.spiritualBuddieUserID, 'purpose': 'edit', 'use_date_filter':1}).success(function (res)
                        {
                            if (res.response == 'S') {
                                    angular.forEach(res.data, function (value, key) {
                                        var k = 'feedback_field_'+value.feedback_field_id;
                                        $scope.feedbackMonthlyFormData[k] = value.user_feedback_field_value;
                                    });
                            }
                        });


                    }, 1000);
                });
            


            }

            $scope.feedbackMonthlyFormData = {
                user_id: $stateParams.id,
                selected_date:$scope.selected_date,
                feedback_type: 'Monthly',
                access_token: window.localStorage.getItem('auth_token')
            }

            $scope.validateFeedbackMonthly = function (feedbackMonthlyForm) {


                if (feedbackMonthlyForm.$valid)
                {
                    $ionicLoading.show({ templateUrl:"templates/loading.html" });

                    var url = wsBaseUrl + 'userServices/feedbackMonthly';
                    $http({
                        method: 'POST',
                        data: $scope.feedbackMonthlyFormData,
                        url: url,
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(function (response) {

                        $timeout(function () {
                            $ionicLoading.hide();
                            if (response.data.response == 'S') {

                                $scope.flash_failure = response.data.message;
                                $state.go('app.my-buddies');
                                /*var alertPopup = $ionicPopup.alert({
                                    title: '',
                                    template: response.data.message,
                                    okType: 'button button-stable button-block btn-login'
                                });
                                alertPopup.then(function (res) {
                                    $state.go('app.my-buddies');
                                });*/
                            }
                            if (response.data.response == 'F') {

                                $scope.flash_failure = response.data.message;
                                $state.go('login');
                                /*var alertPopup = $ionicPopup.alert({
                                    title: 'Error',
                                    template: response.data.message,
                                    okType: 'button button-stable button-block btn-login'
                                });
                                alertPopup.then(function (res) {
                                    $state.go('login');
                                });*/
                            }
                        }, 1000);
                    });
                } else {
                    return false;
                }
            };
        })

        .controller('viewFeedbackMonthlyCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $stateParams, $filter) {

            $scope.dataFound = false;

            $scope.selected_date = $stateParams.year+'-'+ (parseInt($stateParams.month)+1) +'-01 00:00:00';

            $scope.feedbackMonthlyFormData = {
                selected_date: $scope.selected_date,
                feedback_type: 'Monthly',
                access_token: window.localStorage.getItem('auth_token')
            }

            $scope.init = function () {

                $scope.spiritualBuddieUserID = $stateParams.id;
                $ionicLoading.show({ templateUrl:"templates/loading.html" });

                var url = wsBaseUrl + 'userServices/view_feedback_fields';
                $http.post(url, {'feedback_type': 'Monthly', 'access_token': window.localStorage.getItem('auth_token'), 'selected_date': $scope.selected_date, 'spiritual_buddie_user_id': $scope.spiritualBuddieUserID, 'purpose': 'view','use_date_filter':1}).success(function (res)
                {
                    $timeout(function () {
                        $ionicLoading.hide();
                        if (res.response == 'S') {
                            $scope.feedback_fields = res.data;
                            angular.forEach(res.data, function (value, key) {
                                var k = 'feedback_field_'+value.feedback_field_id;
                                $scope.feedbackMonthlyFormData[k] = value.user_feedback_field_value;

                                if (value.user_feedback_field_value!='') {
                                    $scope.dataFound = true;
                                }
                            });
                        }
                        if (res.response == 'F') {
                            $scope.message = res.message;
                        }
                    }, 500);
                });
            }
        })

        .controller('signUpCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http) {
            var url = wsBaseUrl + 'userServices/signUpData';

            $http.post(url).success(function (res)
            {
                if (res.response == 'S') {
                    $scope.master_levels = res.master_levels;
                    $scope.examiners = res.examiners;
                }
                if (res.response == 'F') {
                    $scope.message = res.message;
                }
            });

            $scope.signupFormData = {
                role_id: $scope.role_id,
                device_id: $scope.device_id,
                device_type: $scope.device_type
            }

            $scope.doSignup = function (signupForm) {
                $scope.flash_failure = '';

                if (signupForm.$valid)
                {
                    $ionicLoading.show({ templateUrl:"templates/loading.html" });
                    $http({
                        method: 'POST',
                        data: $scope.signupFormData,
                        url: wsBaseUrl + 'userServices/signUp',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(function (response) {

                        $timeout(function () {
                            $ionicLoading.hide();
                            if (response.data.response == 'S') {
                                $scope.flash_failure = '';
                                window.localStorage.setItem('auth_token', response.data.data.access_token);
                                $state.go('app.dashboard');
                            }
                            if (response.data.response == 'F') {

                                if (response.data.errors != '')
                                {
                                    var allErrors = '';

                                    for ( key in response.data.errors ) {
                                        allErrors += response.data.errors[key] + "\n";
                                    }

                                    $scope.flash_failure = allErrors;

                                } else {
                                    $scope.flash_failure = response.data.message;
                                }

                                $state.go('signup');
                            }
                        }, 1000);
                    });
                } else {
                    return false;
                }
            }
        })

   
    
        .controller('tranierCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $stateParams) {
            $scope.init = function () { 
                /*$ionicLoading.show({ templateUrl:"templates/loading.html" });*/
                var url = wsBaseUrl + 'userServices/spritual_trainer_view_feedback_fields';
                $scope.tranierFormData.monthStart = $stateParams.month
                $scope.tranierFormData.yearStart = $stateParams.year
                $scope.selected_date = $stateParams.year+'-'+ (parseInt($stateParams.month)+1) +'-01 00:00:00';

                 $http.post(url, {'feedback_type': 'for trainers', 'access_token': window.localStorage.getItem('auth_token'), 'selected_date': $scope.selected_date}).success(function (res) {
                            
                             apiVersionName = res.version_name;
                             if(versionName != apiVersionName){
                                $ionicLoading.show({ templateUrl:"templates/new_version.html" });
                                return false;
                            }
                            if (res.response == 'S') {
                                    angular.forEach(res.data, function (value, key) {
                                        var k = 'feedback_field_'+value.feedback_field_id;
                                        console.log(k);
                                        $scope.tranierFormData[k] = value.user_feedback_field_value;
                                    });
                            }
                });    
            }
            
            $scope.flash_success = '';
            $scope.tranierFormData = {
                role_id: $scope.role_id,
                device_id: $scope.device_id,
                device_type: $scope.device_type,
                access_token: window.localStorage.getItem('auth_token')
            }

            $scope.dotranierForm = function (tranierForm) {
                $scope.flash_failure = '';
                $scope.selected_date = $scope.yearStart+'-'+ (parseInt($scope.monthStart)+1) +'-01 00:00:00';
                $scope.tranierFormData.selected_date = $scope.selected_date;
                console.log($scope.tranierFormData);
                $ionicLoading.show({ templateUrl:"templates/loading.html" });

                $http({
                        method: 'POST',
                        data: $scope.tranierFormData,
                        url: wsBaseUrl + 'userServices/spritual_trainer_feedback_fields',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(function (response) {
                        $timeout(function () {
                            $ionicLoading.hide();
                            if (response.data.response == 'S') {
                                $scope.flash_success = "Feedback Successfully Submitted!";
                                this.tranierForm.reset();
                                $timeout(function (){
                                    $scope.flash_success = "";
                                },3000);
                            }
                            if (response.data.response == 'F') {
                                if (response.data.errors != '')
                                {
                                    var allErrors = '';
                                    for ( key in response.data.errors ) {
                                        allErrors += response.data.errors[key] + "\n";
                                    }
                                    $scope.flash_failure = allErrors;

                                } else {
                                    $scope.flash_failure = response.data.message;
                                }
                            }
                            $state.go('app.dashboard');
                        }, 1000);
                    });
            }
        })

        .controller('feedbackTranierMonthlyCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $stateParams) { })
       
    

        .controller('changePwdCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http) {
            
            $scope.flash_success = '';
            
            $scope.changePwdFormData = {
                role_id: $scope.role_id,
                device_id: $scope.device_id,
                device_type: $scope.device_type,
                current_password: "IGNORE",
                access_token: window.localStorage.getItem('auth_token')
            }

            $scope.doChangePwd = function (changePwdForm) {
                $scope.flash_failure = '';
                
                if (changePwdForm.$valid)
                {
                    $ionicLoading.show({ templateUrl:"templates/loading.html" });

                    $http({
                        method: 'POST',
                        data: $scope.changePwdFormData,
                        url: wsBaseUrl + 'userServices/changePassword',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(function (response) {
                        $timeout(function () {
                            $ionicLoading.hide();
                            if (response.data.response == 'S') {
                                $scope.flash_success = "Password Change Successfully!";
                                this.changePwdForm.reset();
                                $timeout(function (){
                                    $scope.flash_success = "";
                                },3000);
                            }
                            if (response.data.response == 'F') {
                                if (response.data.errors != '')
                                {
                                    var allErrors = '';

                                    for ( key in response.data.errors ) {
                                        allErrors += response.data.errors[key] + "\n";
                                    }

                                    $scope.flash_failure = allErrors;

                                } else {
                                    $scope.flash_failure = response.data.message;
                                }
                            }
                            $state.go('app.changePwd');
                        }, 1000);
                    });
                } else {
                    return false;
                }
            }
        });
