'use strict';

angular.module('letusgoApp')
  .controller('CartPayListCtrl', function ($scope, ItemsService, CartItemsService) {

    $scope.$emit('to-parent-cartPayListActive');

    $scope.cartPayList = [];
    CartItemsService.getCartItems(function(data) {

      $scope.cartPayList = data;
      $scope.total = CartItemsService.getTotalMoney($scope.cartPayList );
      $scope.totalNumber = CartItemsService.getTotalNumber($scope.cartPayList );
    });

    $scope.payButton = function() {

      CartItemsService.emptyCartItems();
//      CartItemsService.getCartItems(function(data) {
//
//        $scope.cartPayList = data;
//        $scope.total = CartItemsService.getTotalMoney($scope.cartPayList );
//        $scope.totalNumber = CartItemsService.getTotalNumber($scope.cartPayList );
//      });
    };
  });
