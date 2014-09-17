'use strict';

angular.module('letusgoApp')
  .controller('CartPayListCtrl', function ($scope, ItemsService, CartItemOperateService) {

     $scope.$emit('to-parent-cartPayListActive');

     $scope.cartPayList = ItemsService.get('cartItems');
     $scope.total = CartItemOperateService.getTotalMoney($scope.cartPayList );
     $scope.totalNumber = CartItemOperateService.getTotalNumber($scope.cartPayList );

  });
