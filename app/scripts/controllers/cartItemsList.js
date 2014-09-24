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

    CartItemsService.getCartItems(function(data) {

      $scope.cartItems = data;
      updateTotalAndTotalNumber();
    });
  }

  $scope.$emit('to-parent-cartItemsListActive');

  $scope.cartItems = [];
  updateData();

  $scope.addCartItemNumber = function(cartItem){

    CartItemsService.addCartItemNumber(cartItem.item.id);

    updateData();
  };

  $scope.reduceCartItemNumber = function(cartItem){

    CartItemsService.reduceCartItemNumber(cartItem.item.id);

    updateData();
  };

  $scope.deleteCartItem = function(cartItem){

    CartItemsService.deleteCartItem(cartItem.item.id, $scope.cartItems);

    updateData();
  };

  $scope.changeCartItemNumber = function(cartItem){

    CartItemsService.changeCartItemNumber(cartItem);

    updateData();
  };
});
