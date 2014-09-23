'use strict';

angular.module('letusgoApp')
  .controller('CartItemsListCtrl', function ($scope,ItemsService, CartItemsService) {

  function getTotalNumber(cartItems) {

    return CartItemsService.getTotalNumber(cartItems);
  }

  function getTotalMoney(cartItems) {

    return CartItemsService.getTotalMoney(cartItems);
  }

  function updateTotalAndTotalNumber() {

    $scope.total = getTotalMoney($scope.cartItems);
    $scope.totalNumber = getTotalNumber($scope.cartItems);
  }

  function updateData() {

    updateTotalAndTotalNumber();
  }

  $scope.$emit('to-parent-cartItemsListActive');

  $scope.cartItems = [];
  CartItemsService.getCartItems(function(data) {

    $scope.cartItems = data;
  });
  updateData();

  $scope.addCartItemNumber = function(cartItem){

    CartItemsService.addCartItemNumber(cartItem.item.id);
    CartItemsService.getCartItems(function(data) {

      $scope.cartItems = data;
    });
    updateData();
  };

  $scope.reduceCartItemNumber = function(cartItem){

    CartItemsService.reduceCartItemNumber(cartItem.item.id);
    CartItemsService.getCartItems(function(data) {

      $scope.cartItems = data;
    });
    updateData();
  };

  $scope.deleteCartItem = function(cartItem){

    CartItemsService.deleteCartItem(cartItem.item.id, $scope.cartItems);
    CartItemsService.getCartItems(function(data) {

      $scope.cartItems = data;
    });
    updateData();
  };

  $scope.changeCartItemNumber = function(cartItem){

    CartItemsService.changeCartItemNumber(cartItem);
    CartItemsService.getCartItems(function(data) {

      $scope.cartItems = data;
    });
    updateData();
  };
});
