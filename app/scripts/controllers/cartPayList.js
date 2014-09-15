'use strict';

angular.module('myYoApp')
  .controller('CartPayListCtrl', function ($scope, cartItemOperateService) {

     $scope.cartPayList = Util.localStorage.getStorageItem('cartItems');
     $scope.total = cartItemOperateService.getTotalMoney($scope.cartPayList );
     $scope.totalNumber = cartItemOperateService.getTotalNumber($scope.cartPayList );

  });
