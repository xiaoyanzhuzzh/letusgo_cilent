'use strict';

angular.module('letusgoApp')
  .service('CategoryService', function($http, localStorageService){

    function getCategoriesData(callback){

      $http.get('/api/categories')
       .success(function(data) {

         callback(data);
       });
    }

    function setCategoriesData(categories, callback){

      $http({method: 'POST', url: '/api/categories', data: {'categories': categories}})
       .success(function(data){

         callback(data);
       });
    }


    this.getCategories = function (callback) {

      getCategoriesData(function(data){

        callback(data);
      });
    };

        this.getCategorys = function (items) {

          var categoryNames = [];

          for (var i = 0; i < items.length; i++) {

            if (!_.contains(categoryNames, items[i].category)) {

              categoryNames.push(items[i].category);
            }
          }
          return categoryNames;
        };

        this.getCategorysAndIds = function (items) {

          var categoryNames = this.getCategorys(items);
          var categories = [];

          for (var i = 0; i < categoryNames.length; i++) {

            categories.push({id: i, name: categoryNames[i]});
            localStorageService.set('categories', categories);
          }
          return categories;
        };


        this.deleteCategory = function (category, categories) {

          for (var i = 0; i < categories.length; i++){

            if(category.id === categories[i].id){

              categories = _.without(categories, categories[i]);
              localStorageService.set('categories', categories);
            }
          }
          return categories;
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

        this.changeCategory = function (category, categories) {

          for (var i = 0; i < categories.length; i++){

            if(category.name === categories[i].name){

              categories[i].name = category.name;
              localStorageService.set('categories', categories);
            }
          }
          return categories;
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
