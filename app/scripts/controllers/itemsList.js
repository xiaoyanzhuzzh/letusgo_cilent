'use strict';


angular.module('letusgoApp')
  .controller('ItemsListCtrl', function ($scope, ItemsService, CartItemsService, AddToCartService) {

    $scope.$emit('to-parent-itemsListActive');

    $scope.items = [];
    ItemsService.getItems(function(data) {
      $scope.items = data;
    });

    $scope.cartItems = [];
    CartItemsService.getCartItems(function(data) {
      Sscope.cartItems = data;
    });

    $scope.addToCartButton = function(item) {
      console.log(item);
      CartItemsService.setCartItems(item);

//      $scope.$emit('to-parent-cartCount');
//
//      if (!$scope.cartItems) {
//        $scope.cartItems = [];
//      }
//      AddToCartService.getCartItems(item, $scope.cartItems);
    };
});
