'use strict';


angular.module('letusgoApp')
    .controller('ItemsListCtrl', function ($scope, ItemsService, AddToCartService) {

        $scope.items = ItemsService.get('items');

        $scope.cartItems = ItemsService.get('cartItems');

        $scope.addToCart = function(item) {

          // $scope.$parent.addCartCount();

          if (!$scope.cartItems) {
            $scope.cartItems = [];
          }
          AddToCartService.getCartItems(item, $scope.cartItems);
        };
  });
