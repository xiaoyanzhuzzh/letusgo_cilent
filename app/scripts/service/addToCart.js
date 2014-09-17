'use strict';

angular.module('letusgoApp')
  .service('AddToCartService', function(localStorageService){

        this.isExistInCart = function(barcode, cartItems){
            var item;
            for (var i = 0; i < cartItems.length; i++){
                if (barcode === cartItems[i].item.barcode){
                    item = cartItems[i];
                }
            }
            return item;
        };

        this.getCartItems = function (item, cartItems) {

          var cartItem = this.isExistInCart(item.barcode, cartItems);

          if (cartItem) {
            cartItem.number += 1;
          }
          else{
            cartItems.push({item: item, number: 1});
          }

          localStorageService.set('cartItems', cartItems);
        };
  });
