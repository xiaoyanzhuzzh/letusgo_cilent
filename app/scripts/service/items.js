'use strict';

angular.module('letusgoApp')
    .service('ItemsService',function(localStorageService, $http){

        function getItemsData(callback){

          $http.get('/api/items')
           .success(function (data) {
             callback(data);
           });
        }

        function setItemsData(items, callback){

          $http({method: 'POST', url: '/api/items', data:{'items': items}})
           .success(function (data) {

             callback(data);
           });
        }

        this.getItems = function(callback){

          getItemsData(function(data){

            callback(data);
          });
        };

        this.deleteItem = function (item, callback){

          getItemsData(function(data){
            var items = data;
            var index = _.findIndex(items, {'id': item.id});
            items.splice(index, 1);

            setItemsData(items, function(newData){
              if(newData === 'OK'){
                callback(items);
              }
            });
          });
        };

        this.modifyItem = function (newItem, callback){

          getItemsData(function(data){
            var items = data;
            var index = _.findIndex(items, {'name': newItem.name});
            items[index] = newItem;
            setItemsData(items, function(newData){
              if(newData === 'OK'){
                callback(items);
              }
            });
          });
        };
        // this.modifyItem = function (newItem, items) {
        //
        //   var changingItem = localStorageService.get('changingItem');
        //
        //   for (var i = 0; i < items.length; i++) {
        //
        //     if(changingItem.name === items[i].name) {
        //
        //       items[i].name = newItem.name;
        //       items[i].unit = newItem.unit;
        //       items[i].price = newItem.price;
        //     }
        //   }
        //   localStorageService.set('items', items);
        //   return items;
        // };

         this.get = function(key){

           return localStorageService.get(key);
         };

         this.set = function (key, value){

           localStorageService.set(key, value);
         };
    });
