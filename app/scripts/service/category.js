'use strict';

angular.module('letusgoApp')
  .service('CategoryService', function($http, localStorageService){

    function getCategoriesData(callback){

      $http.get('/api/categories')
       .success(function(data) {

         callback(data);
       });
    }

    function deleteCategoryData(id) {

      $http.delete('/api/categories/' + id);
    }

    function putCategoryData(category) {

      $http({method: 'PUT', url: '/api/categories/' + category.id, data:{'category': category}});
    }

    function addCategoryData(category) {

      $http({method: 'POST', url: '/api/categories/' + category.id, data:{'category': category}});
    }

    this.getCategories = function (callback) {

      getCategoriesData(function(data){

        callback(data);
      });
    };

    this.deleteCategory = function(id) {

      deleteCategoryData(id);
    };

    this.putCategory = function(category) {

      putCategoryData(category);
    };

    this.addCategory = function(category) {

      addCategoryData(category);
    };

    this.deleteItem = function (category, items) {

      for(var i = 0; i < items.length; i++){

        if(items[i].category === category.name){

          items = _.without(items, items[i]);
          i--;
        }
      }
      localStorageService.set('items', items);
      return items;
        };

    this.changeItem = function (category, items) {

      var changingCategory = localStorageService.get('changingCategory');

      for(var i = 0; i < items.length; i++){

        if(items[i].category === changingCategory.name){

          items[i].category = category.name;
          localStorageService.set('changingCategory', category);
        }
      }
      localStorageService.set('items', items);
      return items;
    };
  });
