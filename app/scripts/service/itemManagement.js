'use strict';

angular.module('letusgoApp')
  .service('ItemManagementService', function(localStorageService){

        this.deleteItem = function (items, item) {

          for (var i = 0; i < items.length; i++){

            if(item.name === items[i].name){

              items = _.without(items, items[i]);
              localStorageService.set('items', items);
            }
          }
          return items;
        };

        this.modifyItem = function (newItem, items) {

          var changingItem = localStorageService.getStorageItem('changingItem');

          for (var i = 0; i < items.length; i++) {

            if(changingItem.name === items[i].name) {

              items[i].name = newItem.name;
              items[i].unit = newItem.unit;
              items[i].price = newItem.price;
            }
          }
          localStorageService.set('items', items);
          return items;
        };
  });
