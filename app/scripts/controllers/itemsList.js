'use strict';


angular.module('letusgoApp')
    .controller('ItemsListCtrl', function ($scope, ItemsService, AddToCartService) {

        $scope.items = Util.localStorage.getStorageItem('items');

        $scope.cartItems = Util.localStorage.getStorageItem('cartItems');

        $scope.addToCart = function(item) {

          // $scope.$parent.addCartCount();

          if (!$scope.cartItems) {
            $scope.cartItems = [];
          }

          var cartItem = AddToCartService.isExistInCart(item.barcode, $scope.cartItems);

          if (cartItem) {
            cartItem.number += 1;
          }
          else{
            $scope.cartItems.push({item: item, number: 1});
          }

          Util.localStorage.setStorageItem('cartItems', $scope.cartItems);

        };
  });
