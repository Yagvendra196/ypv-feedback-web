// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

    .run(function ($ionicPlatform, $state) {
        $ionicPlatform.ready(function () {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            /*
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
            */
            
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $ionicPlatform.registerBackButtonAction(function(event) {
            if($state.current.name=="app.dashboard") {
                navigator.app.exitApp();
            }
            else {
                navigator.app.backHistory();
            }
        }, 100);
    })

    .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('app', {
        url: '/app',
        templateUrl: 'templates/menu.html',
        abstract: true,
        controller: 'menuCtrl'
    })

    .state('app.dashboard', {
        url: '/dashboard',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardCtrl'
            }
        }
    })

    .state('app.my-buddies', {
        url: '/myBuddies/:context',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/my-buddies.html',
                controller: 'myBuddiesCtrl'
            }
      }
    })

    .state('app.feedback-buddies', {
        url: '/feedbackBuddies',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/feedback-buddies.html',
                controller: 'feedbackBuddiesCtrl'
            }
        }
    })

    .state('app.add-buddies', {
        url: '/addBuddies',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/add-buddies.html',
                controller: 'addBuddiesCtrl'
            }
        }
    })

    .state('app.feedbackWeekly', {
        url: '/feedbackWeekly/:id/:idWeek',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/feedback-weekly.html',
                controller: 'feedbackWeeklyCtrl'
            }
        }
    })

    .state('app.viewFeedbackWeekly', {
        url: '/viewFeedbackWeekly/:id/:idWeek',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/view-feedback-weekly.html',
                controller: 'viewFeedbackWeeklyCtrl'
            }
        }
    })

    .state('app.feedbackMonthly', {
        url: '/feedbackMonthly/:id/:month/:year',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/feedback-monthly.html',
                controller: 'feedbackMonthlyCtrl'
            }
        }
    })

    .state('app.viewFeedbackMonthly', {
        url: '/viewFeedbackMonthly/:id/:month/:year',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/view-feedback-monthly.html',
                controller: 'viewFeedbackMonthlyCtrl'
            }
        }
    })

    .state('app.changePwd', {
        url: '/changePwd',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/change-password.html',
                controller: 'changePwdCtrl'
            }
        }
    })

    .state('app.feedbacktranier', {
        url: '/tranier',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/feedback-tranier.html',
                controller: 'tranierCtrl'
            }
        }
    })
    
    .state('login', {
        url: '/login',
        cache: false,
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })
        
    .state('signup', {
        url: '/signUp',
        cache: false,
        templateUrl: 'templates/signup.html',
        controller: 'signUpCtrl'
    })


    .state('logout', {
        url: '/logout',
        cache: false,
        controller: 'logoutCtrl'
    })

    // if none of the above states are matched, use this as the fallback
    if(window.localStorage.getItem('auth_token'))
    {
           $urlRouterProvider.otherwise('/app/dashboard');
    }
    else
    {
            $urlRouterProvider.otherwise('/login');
    }
});