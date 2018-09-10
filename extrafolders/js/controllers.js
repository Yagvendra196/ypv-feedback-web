angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $timeout, $ionicModal, $ionicLoading, $ionicPopup, $state, $http, $filter) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) { });

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        /*$ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });*/

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Triggered in the login modal to close it
        $scope.rowItem = function() {
            $('#row1').toggleClass('right-tick');
            $('#rowItems').toggleClass('alert-box');
        }; 
        
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
            var year = $filter('date')(new Date(),'yyyy');
            var url = baseUrl + 'api/userServices/getYearWeek';

            $http.post(url, {'year': year}).success(function (response)
            {
                $scope.yearWeeks        = response.yearWeeks;
                $scope.weekID           = response.week.idWeek;
                $scope.weekStartDate    = response.week.week_start_date;
                $scope.weekEndDate      = response.week.week_end_date;
            });
        }

        $scope.getPreviousWeek = function () {
            var wsd_arr = $scope.weekStartDate.split('/');
            var wed_arr = $scope.weekEndDate.split('/');
            var length = $scope.yearWeeks.length;
            var previousCount = $scope.yearWeeks.length;

            angular.forEach($scope.yearWeeks, function(value, key) {
                var sd_arr = value.week_start_date.split('/');
                var ed_arr = value.week_end_date.split('/');
                if ((wsd_arr[0] == ed_arr[0]) && (wsd_arr[1] == ed_arr[1])) {
                    
                    if (previousCount == length) {
                        $ionicLoading.show({ template: 'Loading...' });
                        var year = wsd_arr[2] - 1;
                        var url = baseUrl + 'api/userServices/getYearWeek';

                        $http.post(url, {'year': year}).success(function (response)
                        {
                            $timeout(function () {  
                                $ionicLoading.hide();
                                $scope.yearWeeks = response.yearWeeks;
                                $scope.getPreviousWeek();
                            }, 1000);
                        });
                    }
                    $scope.weekID        = value.idWeek;
                    $scope.weekStartDate = value.week_start_date;
                    $scope.weekEndDate   = value.week_end_date;
                };
                previousCount--;
            });
        }

        $scope.getNextWeek = function () {
            var wsd_arr = $scope.weekStartDate.split('/');
            var wed_arr = $scope.weekEndDate.split('/');
            var length = $scope.yearWeeks.length;
            var nextCount = $scope.yearWeeks.length;
            
            angular.forEach($scope.yearWeeks, function(value, key) {
                var sd_arr = value.week_start_date.split('/');
                var ed_arr = value.week_end_date.split('/');
                
                if ((wed_arr[0] == sd_arr[0]) && (wed_arr[1] == sd_arr[1])) {

                    if (nextCount == 1) {
                        $ionicLoading.show({ template: 'Loading...' });
                        var year = +wsd_arr[2] + +1;
                        var url = baseUrl + 'api/userServices/getYearWeek';

                        $http.post(url, {'year': year}).success(function (response)
                        {
                            $timeout(function () {  
                                $ionicLoading.hide();
                                $scope.yearWeeks = response.yearWeeks;
                                $scope.getNextWeek();
                            }, 1000);
                        });
                    };
                    $scope.weekID        = value.idWeek;
                    $scope.weekStartDate = value.week_start_date;
                    $scope.weekEndDate   = value.week_end_date;
                };
                nextCount--;
            });
        }
    })

    /*
    .controller('PlaylistsCtrl', function($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })
         
    .controller('homeCtrl', function($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })
    */

    .controller('loginCtrl', function ($scope, $ionicPopup, $state) {
        // A confirm dialog
        $scope.showConfirm = function () {
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
        };
    })

    .controller('dashboardCtrl', function ($scope, $ionicPopup, $state) { })

    .controller('menuCtrl', function ($scope, $ionicPopup, $state) { })

    /*
    .controller('myBuddiesCtrl', ['$scope','$timeout','$ionicLoading','$ionicPopup','$state','$http' , function($scope,$timeout,$ionicLoading,$ionicPopup,$state,$http) {
        $ionicLoading.show({
            template: 'Loading...'
        });
         
        $scope.abc = function() {
            angular.element(document).ready(function () {
                var url = baseUrl + 'api/userServices/getMyBuddies';
         
                $http.post(url).success(function(response) {
                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.myBuddies = response.data;
                    }, 2000);
                    // alert(response);
                });
            });
        }
    }])
    */

    .controller('myBuddiesCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $filter) {

        $scope.init = function () {
            $ionicLoading.show({ template: 'Loading...' });

            var url = baseUrl + 'api/userServices/getMyBuddies';

            $http.post(url).success(function (response)
            {
                $timeout(function () {  
                    $ionicLoading.hide();
                    $scope.myBuddies = response.data; 
                }, 1000);
            });
        }
    })

    .controller('feedbackBuddiesCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $filter) {

        $scope.init = function () {
            $ionicLoading.show({ template: 'Loading...' });

            var url = baseUrl + 'api/userServices/getFeedbackBuddies';

            $http.post(url).success(function (response)
            {
                $timeout(function () {  
                    $ionicLoading.hide();
                    $scope.feedbackBuddies  = response.data;  
                }, 1000);
            });
        }
    })

    .controller('addBuddiesCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http) {
        
        $scope.init = function () {
            $ionicLoading.show({ template: 'Loading...' });

            var url = baseUrl + 'api/userServices/getAddBuddies';

            $http.post(url).success(function (response)
            {
                $timeout(function () {
                    $ionicLoading.hide();
                    $scope.addBuddies = response.data;
                }, 500);
                
            });
        }

        $scope.addBuddy = function(user_id) {
            $ionicLoading.show({ template: 'Loading...' });
            
            $http.post(baseUrl + 'api/userServices/setAddBuddies', {'user_id': user_id}).success(function(data, status, headers, config) {
                $timeout(function () {
                    $ionicLoading.hide();
                    $scope.init();
                }, 500);
                
            });
        }
    })

    .controller('feedbackWeeklyCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $stateParams) {

        $scope.init = function () {
            $scope.user_id = $stateParams.id;
            $scope.idWeek = $stateParams.idWeek;
            $ionicLoading.show({ template: 'Loading...' });
            
            var url = baseUrl + 'api/userServices/feedback_fields';

            $http.post(url, {'feedback_type':1, 'user_id':$scope.user_id}).success(function (response)
            {
                $timeout(function () {
                    $ionicLoading.hide();
                    $scope.feedback_fields = response.data;
                    $scope.user_details = response.info;
                }, 500);
            });
        }
    })

    .controller('viewFeedbackWeeklyCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $stateParams) {

        $scope.init = function () {
            $scope.idWeek = $stateParams.idWeek;
            $scope.spiritualBuddieUserID = $stateParams.id;
            $ionicLoading.show({ template: 'Loading...' });
            
            var url = baseUrl + 'api/userServices/view_feedback_fields';

            $http.post(url, {'feedback_type':'Weekly', 'idWeek':$scope.idWeek, 'spiritual_buddie_user_id':$scope.spiritualBuddieUserID}).success(function (res)
            {
                $timeout(function () {
                    $ionicLoading.hide();
                    if (res.response == 'S') {
                        $scope.feedback_fields = res.data;        
                    }
                    if (res.response == 'F') {
                        $scope.message = res.message;               
                    }
                }, 500);
            });
        }
    })

    .controller('feedbackMonthlyCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $stateParams) {

        $scope.init = function () {
            $scope.user_id = $stateParams.id;
            $scope.selected_date = new Date();
            $ionicLoading.show({ template: 'Loading...' });

            var url = baseUrl + 'api/userServices/feedback_fields';

            $http.post(url, {'feedback_type':2, 'user_id':$scope.user_id}).success(function (response)
            {
                $timeout(function () {
                    $ionicLoading.hide();
                    $scope.feedback_fields = response.data;
                    $scope.user_details = response.info;
                }, 500);
            });
        }
    })

    .controller('viewFeedbackMonthlyCtrl', function ($scope, $timeout, $ionicLoading, $ionicPopup, $state, $http, $stateParams) {

        $scope.init = function () {
            $scope.selected_date = new Date();
            $scope.spiritualBuddieUserID = $stateParams.id;
            $ionicLoading.show({ template: 'Loading...' });
            
            var url = baseUrl + 'api/userServices/view_feedback_fields';

            $http.post(url, {'feedback_type':'Monthly', 'selected_date':$scope.selected_date, 'spiritual_buddie_user_id':$scope.spiritualBuddieUserID}).success(function (res)
            {
                $timeout(function () {
                    $ionicLoading.hide();
                    if (res.response == 'S') {
                        $scope.feedback_fields = res.data;        
                    }
                    if (res.response == 'F') {
                        $scope.message = res.message;               
                    }
                }, 500);
            });
        }
    })

    .controller('signUpCtrl', function ($scope, $ionicPopup, $state) { });