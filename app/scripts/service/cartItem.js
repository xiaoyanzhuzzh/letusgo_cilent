'use strict';

angular.module('letusgoApp')
  .service('CartItemsService', function($http){

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
      console.log(cartItem);
      if (cartItem) {
        cartItem.number += 1;
      }
      else{
        cartItems.push({item: item, number: 1});
      }
    }

    function getCartItemsData(callback) {

      $http.get('/api/cartItems')
        .success(function(data) {
          callback(data);
        });
    }

    function setCartItemsData(cartItems) {

      $http({method: 'POST', url: '/api/cartItems', data: {'cartItems': cartItems}});
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

    function emptyCartItemsData(){

      $http.post('/api/payment/');
    }

    this.getCartItems = function(callback) {

      getCartItemsData(function(data) {

        callback(data);
      });
    };

    this.setCartItems = function(item) {
      console.log(item.name+'+++++++++++++');

      this.getCartItems(function(data) {
        updateCartItems(item, data);
        setCartItemsData(data);
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
