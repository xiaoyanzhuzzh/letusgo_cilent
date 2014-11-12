'use strict';

angular.module('letusgoApp')
  .service('CartItemsService', function($http){

    function getCartItemsData(callback) {

      $http.get('/api/cartItems')
        .success(function(data) {

          callback(data);
        });
    }

    function setCartItemsData(cartItem) {

      $http({method: 'POST', url: '/api/cartItems', data: {'cartItem': cartItem}});
    }

    function isExistInCart(id, cartItems) {
      var item;
      for (var i = 0; i < cartItems.length; i++){

        if (id === cartItems[i].item.id){
          item = cartItems[i];
        }
      }
      return item;
    }

    function updateCartItems(item, cartItems) {
      var cartItem = isExistInCart(item.id, cartItems);

      if (cartItem) {
        cartItem.number += 1;
      }
      else{
        cartItems.push({item: item, number: 1});
      }
    }

    this.setCartItems = function(item) {
      this.getCartItems(function(data) {
        updateCartItems(item, data);
        setCartItemsData(data);
      });
    };


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

    function emptyCartItemsData(){

      $http.post('/api/payment/');
    }

    this.getCartItems = function(callback) {

      getCartItemsData(function(data) {

        callback(data);
      });
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

    this.emptyCartItems = function() {

      emptyCartItemsData();
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

  });
