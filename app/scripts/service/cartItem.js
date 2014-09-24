'use strict';

angular.module('letusgoApp')
  .service('CartItemsService', function($http, localStorageService){

    function getCartItemsData(callback) {

      $http.get('/api/cartItems')
        .success(function(data) {

          callback(data);
        });
    }

    function setCartItemsData(cartItem) {

      $http({method: 'POST', url: '/api/cartItems', data: {'cartItem': cartItem}});
    }

    function changeCartItemNumberData(cartItem) {

      $http({method: 'PUT', url: '/api/cartItems', data: {'cartItem': cartItem}});
    }

    function addCartItemNumberData(id) {

      $http({method: 'POST', url: '/api/cartItems/' + id});
    }

    function reduceCartItemNumberData(id) {

      $http({method: 'PUT', url: '/api/cartItems/' + id});
    }

    function deleteCartItemData(id) {

      $http.delete('api/cartItems/' + id);
    }

    this.getCartItems = function(callback) {

      getCartItemsData(function(data) {

        callback(data);
      });

    };

    this.setCartItems = function(item) {

      setCartItemsData(item);
    };

    this.addCartItemNumber = function(id) {

      addCartItemNumberData(id);
    };

    this.reduceCartItemNumber = function(id) {

      reduceCartItemNumberData(id);
    };

    this.deleteCartItem = function(id) {

      deleteCartItemData(id);
    };

    this.changeCartItemNumber = function(cartItem) {

      changeCartItemNumberData(cartItem);
    };

    this.getTotalNumber = function(array){
        var totalNumber = 0;
        if(!array){
          array = [];
        }
        for(var i = 0; i < array.length; i++){
            totalNumber += array[i].number;
        }
        return totalNumber;
    };

    this.getTotalMoney = function(array){
        var total = 0;
        if(!array){
          array = [];
        }
        for(var i = 0; i < array.length; i++){
            total += array[i].number * array[i].item.price;
        }
        return total;
    };

//     this.deleteCartItem = function(cartItem, cartArray){
//
//         for(var i = 0; i < cartArray.length; i++){
//             if( cartItem.item.name === cartArray[i].item.name){
//                 cartArray = _.without(cartArray,cartArray[i]);
//
//                localStorageService.set('cartItems', cartArray);
//                localStorageService.set('cartCount', this.getTotalNumber(cartArray));
//             }
//         }
//         return cartArray;
//     };
//
//     this.changeCurrentCartItemNumber = function(cartItem, cartArray){
//
//       for(var i = 0; i < cartArray.length; i++){
//           if( cartItem.item.name === cartArray[i].item.name){
//
//               cartArray[i].number = parseInt(cartItem.number);
//
//              localStorageService.set('cartItems', cartArray);
//              localStorageService.set('cartCount', this.getTotalNumber(cartArray));
//           }
//       }
//
//     };
  });
