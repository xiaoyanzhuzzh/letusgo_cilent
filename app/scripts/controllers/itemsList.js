'use strict';


angular.module('letusgoApp')
  .controller('ItemsListCtrl', function ($scope, ItemsService, CartItemsService) {

    $scope.items = [];
    ItemsService.getItems(function(data) {
      $scope.items = data;
    });

    $scope.cartItems = [];
    CartItemsService.getCartItems(function(data) {
      $scope.cartItems = data;
    });

    $scope.addToCartButton = function(item) {

      CartItemsService.setCartItems(item);

      $scope.$emit('to-parent-cartCount');
    };
});
