// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('dashboard', {
        url: '/dashboard',
        cache: false,
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
    })

    .state('app', {
        url: '/app',
        templateUrl: 'templates/menu.html',
        abstract: true,
        controller: 'menuCtrl'
    })

    .state('app.my-buddies', {
        url: '/myBuddies',
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
        url: '/feedbackMonthly/:id/:idWeek',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/feedback-monthly.html',
                controller: 'feedbackMonthlyCtrl'
            }
        }
    })

    .state('app.viewFeedbackMonthly', {
        url: '/viewFeedbackMonthly/:id/:idWeek',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/view-feedback-monthly.html',
                controller: 'viewFeedbackMonthlyCtrl'
            }
        }
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })
        
    .state('signup', {
        url: '/signUp',
        templateUrl: 'users/signUp',
        controller: 'signUpCtrl'
    })

        // if none of the above states are matched, use this as the fallback
         $urlRouterProvider.otherwise('login');
        //$urlRouterProvider.otherwise('app/dashboard');
    });