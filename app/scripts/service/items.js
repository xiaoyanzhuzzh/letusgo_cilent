'use strict';

angular.module('letusgoApp')
  .service('ItemsService',function(localStorageService, $http){

    function getItemsData(callback) {

      $http.get('/api/items')
       .success(function(data) {

          callback(data);
       });
    }

    function deleteItemData(id) {

      $http.delete('/api/items/' + id);
    }

    function putItemData(item) {

      $http({method: 'PUT', url: '/api/items/' + item.id, data:{'item': item}});
    }

    function addItemData(item) {

      $http({method: 'POST', url: 'api/items/' + item.id, data:{'item': item}});
    }

    function getMaxIdData(callback) {

      $http.get('api/maxItemId')
        .success(function(data) {

          callback(data);
        });
    }

    function setMaxItemIdData() {

      $http({method: 'POST', url: 'api/maxItemId/'});
    }

    this.getMaxId = function(callback){

      getMaxIdData(function(data) {

        callback(data);
      });
    };

    this.setMaxItemId = function() {

      setMaxItemIdData();
    };

    this.getItems = function(callback){

      getItemsData(function (data) {

        if(data === []) {

          $http.post('/api/items');
        }
        callback(data);
      });
    };

    this.putItem = function(item) {

      putItemData(item);
    };

    this.addItem = function(item) {

      addItemData(item);
    };

    this.deleteItem = function(id){

      deleteItemData(id);
    };

    this.get = function(key){

     return localStorageService.get(key);
    };

    this.set = function (key, value){

     localStorageService.set(key, value);
    };
  });
