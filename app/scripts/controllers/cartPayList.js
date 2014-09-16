'use strict';

angular.module('letusgoApp')
  .controller('CartPayListCtrl', function ($scope, CartItemOperateService) {

     $scope.cartPayList = Util.localStorage.getStorageItem('cartItems');
     $scope.total = CartItemOperateService.getTotalMoney($scope.cartPayList );
     $scope.totalNumber = CartItemOperateService.getTotalNumber($scope.cartPayList );

  });
