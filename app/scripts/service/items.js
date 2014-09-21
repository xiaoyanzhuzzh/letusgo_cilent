'use strict';

angular.module('letusgoApp')
  .service('ItemsService',function(localStorageService, $http){

    function getItemsData(callback) {

      $http.get('/api/items')
       .success(function(data) {
          callback(data);
       });
    }

//    function postItemsData(items, callback) {
//
//      $http({method: 'POST', url: '/api/items', data:{'items': items}})
//       .success(function(data) {
//
//         callback(data);
//       });
//    }

//    function deleteItemData(id) {
//
//      $http.delete('/api/items/' + id);
//    }
//
//    function putItemData(item) {
//      $http({method: 'PUT', url: '/api/items/' + item.id, data:{'item': item}});
//
//    }
    this.getItems = function(callback){

      getItemsData(function(data){
        callback(data);
      });
    };
//
//    this.deleteItem = function(id){
//
//      deleteItemData(id);
//    };
//
//    this.putItem = function(item) {
//      putItemData(item);
//    };

    this.get = function(key){

     return localStorageService.get(key);
    };

    this.set = function (key, value){

     localStorageService.set(key, value);
    };
  });
