'use strict';

angular
  .module('letusgoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/itemsList', {
        templateUrl: 'views/itemsList.html',
        controller: 'ItemsListCtrl'
      })
      .when('/cartItemsList', {
        templateUrl: 'views/cartItemsList.html',
        controller: 'CartItemsListCtrl'
      })

      .when('/cartPayList', {
        templateUrl: 'views/cartPayList.html',
        controller: 'CartPayListCtrl'
      })
      .when('/categoryModify', {
        templateUrl: 'views/categoryModify.html',
        controller: 'CategoryModifyCtrl'
      })
      .when('/categoryAdd', {
        templateUrl: 'views/categoryAdd.html',
        controller: 'CategoryAddCtrl'
      })
      .when('/itemModify', {
        templateUrl: 'views/itemModify.html',
        controller: 'ItemModifyCtrl'
      })
      .when('/itemAdd', {
        templateUrl: 'views/itemAdd.html',
        controller: 'ItemAddCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
