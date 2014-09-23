'use strict';

angular.module('letusgoApp')
  .controller('CartPayListCtrl', function ($scope, ItemsService, CartItemsService) {

     $scope.$emit('to-parent-cartPayListActive');

     $scope.cartPayList = ItemsService.get('cartItems');
     $scope.total = CartItemsService.getTotalMoney($scope.cartPayList );
     $scope.totalNumber = CartItemsService.getTotalNumber($scope.cartPayList );

  });
