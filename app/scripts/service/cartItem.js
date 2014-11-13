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
      if (cartItem) {
        cartItem.number += 1;
      }
      else{
        cartItems.push({item: item, number: 1});
      }
    }

    function addCartItemNumberData(cartItems, id){

      var cartItem = _.find(cartItems, function(cartItem) {
        return cartItem.item.id === id;
      });

      cartItem.number += 1;
      return cartItem;
    }

    function reduceCartItemNumberData(cartItems, id){
      var cartItem = _.find(cartItems, function(cartItem) {
        return cartItem.item.id === id;
      });

      if(cartItem.number > 1){
        cartItem.number -= 1;
      }
      return cartItem;
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

    function deleteCartItemData(id) {

      $http.delete('api/cartItems/' + id);
    }

    function emptyCartItemsData(){

      $http.post('/api/payment/');
    }

    function changeCartItemNumberData(cartItem) {

      $http({method: 'PUT', url: '/api/cartItems/' + cartItem.item.id, data:{'cartItem': cartItem}});
    }

    this.getCartItems = function(callback) {

      getCartItemsData(function(data) {

        callback(data);
      });
    };

    this.setCartItems = function(item) {

      this.getCartItems(function(data) {

        updateCartItems(item, data);
        setCartItemsData(data);
      });
    };

    this.addCartItemNumber = function(id, callback) {

      this.getCartItems(function(data) {

        var cartItem = addCartItemNumberData(data, id);
        changeCartItemNumberData(cartItem);

        callback();
      });
    };

    this.reduceCartItemNumber = function(id, callback) {

      this.getCartItems(function(data) {

        var cartItem = reduceCartItemNumberData(data, id);
        changeCartItemNumberData(cartItem);

        callback();
      });
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
