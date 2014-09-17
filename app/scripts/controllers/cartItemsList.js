'use strict';

angular.module('letusgoApp')
  .controller('CartItemsListCtrl', function ($scope,ItemsService, CartItemOperateService) {

  function getTotalNumber(cartItems) {
    return CartItemOperateService.getTotalNumber(cartItems);
  }

  function getTotalMoney(cartItems) {
    return CartItemOperateService.getTotalMoney(cartItems);
  }

  function updateTotalAndTotalNumber() {
    $scope.total = getTotalMoney($scope.cartItems);
    $scope.totalNumber = getTotalNumber($scope.cartItems);
  }

  function updateData() {
    updateTotalAndTotalNumber();
    $scope.$parent.cartCount = getTotalNumber($scope.cartItems);
  }

  $scope.$emit('to-parent-cartItemsListActive');

  $scope.cartItems = ItemsService.get('cartItems');

  updateTotalAndTotalNumber();

  $scope.changeCartItemNumber = function(cartItem){
    CartItemOperateService.changeCurrentCartItemNumber(cartItem, $scope.cartItems);
    updateData();
  };

  $scope.addCartItemNumber = function(cartItem){
    CartItemOperateService.addCartItemNumber(cartItem, $scope.cartItems);
    updateData();
  };

  $scope.reduceCartItemNumber = function(cartItem){
    CartItemOperateService.reduceCartItemNumber(cartItem, $scope.cartItems);
    updateData();
  };

  $scope.deleteCartItem = function(cartItem){
    $scope.cartItems = CartItemOperateService.deleteCartItem(cartItem, $scope.cartItems);
    updateData();
  };
});
