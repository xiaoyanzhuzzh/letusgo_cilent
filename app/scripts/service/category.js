'use strict';

angular.module('letusgoApp')
  .service('CategoryService', function($http){

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

    function getMaxCategoryIdData(callback) {

      $http.get('api/maxCategoryId')
        .success(function(data) {

          callback(data);
        });
    }

    function setMaxCategoryIdData() {

      $http({method: 'POST', url: 'api/maxCategoryId/'});
    }

    this.getMaxCategoryId = function(callback){

      getMaxCategoryIdData(function(data) {

        callback(data);
      });
    };

    this.setMaxCategoryId = function() {

      setMaxCategoryIdData();
    };

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
  });
