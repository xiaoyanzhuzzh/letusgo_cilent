'use strict';


angular.module('letusgoApp')
  .controller('indexCtrl', function ($scope, ItemsService) {

    function activity(homelist, itemslist, cartItemsList, cartPayList, categoryManagement, itemManagement) {

      $scope.homeActive = homelist;
      $scope.itemsListActive = itemslist;
      $scope.cartItemsListActive = cartItemsList;
      $scope.cartPayListActive = cartPayList;
      $scope.categoryManagementActive = categoryManagement;
      $scope.itemManagementActive = itemManagement
    }

    $scope.cartCount = ItemsService.get('cartCount');

    $scope.$on('to-parent-cartCount', function () {

      if(!$scope.cartCount){

        $scope.cartCount = 0;
      }
      ItemsService.set('cartCount', ++$scope.cartCount);
    });

    $scope.$on('to-parent-homeActive', function () {

      activity(true, false, false, false, false, false);
    });

    $scope.$on('to-parent-itemsListActive', function () {

      activity(false, true, false, false, false, false);
    });

    $scope.$on('to-parent-cartItemsListActive', function () {

      activity(false, false, true, false, false, false);
    });

    $scope.$on('to-parent-cartPayListActive', function () {

      activity(false, false, false, true, false, false);
    });

    $scope.$on('to-parent-categoryManagementActive', function () {

      activity(false, false, false, false, true, false);
    });

    $scope.$on('to-parent-itemManagementActive', function () {
      activity(false, false, false, false, false, true);
    });
});
