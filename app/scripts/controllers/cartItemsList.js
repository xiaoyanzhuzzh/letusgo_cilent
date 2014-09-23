'use strict';

angular.module('letusgoApp')
  .controller('CartItemsListCtrl', function ($scope,ItemsService, CartItemsService) {

//  function getTotalNumber(cartItems) {
//    return CartItemsService.getTotalNumber(cartItems);
//  }
//
//  function getTotalMoney(cartItems) {
//    return CartItemsService.getTotalMoney(cartItems);
//  }
//
//  function updateTotalAndTotalNumber() {
//    $scope.total = getTotalMoney($scope.cartItems);
//    $scope.totalNumber = getTotalNumber($scope.cartItems);
//  }
//
//  function updateData() {
//    updateTotalAndTotalNumber();
//    $scope.$parent.cartCount = getTotalNumber($scope.cartItems);
//  }

  $scope.$emit('to-parent-cartItemsListActive');


    $scope.cartItems = [];

    CartItemsService.getCartItems(function(data) {

      $scope.cartItems = data;
    });
    console.log($scope.cartItems);



//  updateTotalAndTotalNumber();
//
//  $scope.changeCartItemNumber = function(cartItem){
//    CartItemsService.changeCurrentCartItemNumber(cartItem, $scope.cartItems);
//    updateData();
//  };
//
//  $scope.addCartItemNumber = function(cartItem){
//    CartItemsService.addCartItemNumber(cartItem, $scope.cartItems);
//    updateData();
//  };
//
//  $scope.reduceCartItemNumber = function(cartItem){
//    CartItemsService.reduceCartItemNumber(cartItem, $scope.cartItems);
//    updateData();
//  };
//
//  $scope.deleteCartItem = function(cartItem){
//    $scope.cartItems = CartItemsService.deleteCartItem(cartItem, $scope.cartItems);
//    updateData();
//  };
});
