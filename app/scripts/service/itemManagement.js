'use strict';

angular.module('letusgoApp')
  .service('ItemManagementService', function(){

        this.deleteItem = function (items, item) {

          for (var i = 0; i < items.length; i++){

            if(item.name === items[i].name){

              items = _.without(items, items[i]);
              Util.localStorage.setStorageItem('items', items);
            }
          }
          return items;
        };

        this.modifyItem = function (newItem, items) {

          var changingItem = Util.localStorage.getStorageItem('changingItem');

          for (var i = 0; i < items.length; i++) {

            if(changingItem.name === items[i].name) {

              items[i].name = newItem.name;
              items[i].unit = newItem.unit;
              items[i].price = newItem.price;
            }
          }
          Util.localStorage.setStorageItem('items', items);
          return items;
        };
  });
