'use strict';

angular.module('myYoApp')
  .service('cartItemOperateService', function(){

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

    this.addCartItemNumber = function(cartItem, cartArray){

        for (var i = 0; i < cartArray.length; i++){
            if(cartItem.item.name === cartArray[i].item.name) {
                 cartArray[i].number += 1;

                 Util.localStorage.setStorageItem('cartItems', cartArray);
                 Util.localStorage.setStorageItem('cartCount', this.getTotalNumber(cartArray));
            }
        }
    };

    this.reduceCartItemNumber = function(cartItem, cartArray){

        for (var i = 0; i < cartArray.length; i++){
            if(cartItem.item.name === cartArray[i].item.name){
                if (cartArray[i].number > 1){
                    cartArray[i].number -= 1;

                    Util.localStorage.setStorageItem('cartItems', cartArray);
                    Util.localStorage.setStorageItem('cartCount', this.getTotalNumber(cartArray));
                }
                break;
            }
        }

    };

     this.deleteCartItem = function(cartItem, cartArray){

         for(var i = 0; i < cartArray.length; i++){
             if( cartItem.item.name === cartArray[i].item.name){
                 cartArray = _.without(cartArray,cartArray[i]);

                 Util.localStorage.setStorageItem('cartItems', cartArray);
                 Util.localStorage.setStorageItem('cartCount', this.getTotalNumber(cartArray));
             }
         }
         return cartArray;
     };

     this.changeCurrentCartItemNumber = function(cartItem, cartArray){

       for(var i = 0; i < cartArray.length; i++){
           if( cartItem.item.name === cartArray[i].item.name){

               cartArray[i].number = parseInt(cartItem.number);

               Util.localStorage.setStorageItem('cartItems', cartArray);
               Util.localStorage.setStorageItem('cartCount', this.getTotalNumber(cartArray));
           }
       }

     };


  });
