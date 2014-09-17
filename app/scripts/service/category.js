'use strict';

angular.module('letusgoApp')
  .service('CategoryService', function(localStorageService){

        this.getCategorys = function (items) {

          var categoryNames = [];

          for (var i = 0; i < items.length; i++) {

            if (!_.contains(categoryNames, items[i].category)) {

              categoryNames.push(items[i].category);
            }
          }
          return categoryNames;
        };

        this.getCategorysAndId = function (items) {

          var categoryNames = this.getCategorys(items);
          var categorys = [];

          for (var i = 0; i < categoryNames.length; i++) {

            categorys.push({id: i, name: categoryNames[i]});
            localStorageService.set('categorys', categorys);
          }
          return categorys;
        };


        this.deleteCategory = function (category, categorys) {

          for (var i = 0; i < categorys.length; i++){

            if(category.id === categorys[i].id){

              categorys = _.without(categorys, categorys[i]);
              localStorageService.set('categorys', categorys);
            }
          }
          return categorys;
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

        this.changeCategory = function (category, categorys) {

          for (var i = 0; i < categorys.length; i++){

            if(category.name === categorys[i].name){

              categorys[i].name = category.name;
              localStorageService.set('categorys', categorys);
            }
          }
          return categorys;
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
