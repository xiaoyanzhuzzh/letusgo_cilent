'use strict';


angular.module('letusgoApp')
    .controller('ItemsListCtrl', function ($scope, ItemsService, AddToCartService) {

      $scope.$emit('to-parent-itemsListActive');

      $scope.items = ItemsService.get('items');

      $scope.cartItems = ItemsService.get('cartItems');

      $scope.addToCart = function(item) {

        $scope.$emit('to-parent-cartCount');

        if (!$scope.cartItems) {
          $scope.cartItems = [];
        }
        AddToCartService.getCartItems(item, $scope.cartItems);
      };
  });
