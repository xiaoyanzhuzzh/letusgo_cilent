'use strict';

angular.module('letusgoApp')
    .controller('CategoryModifyCtrl', function ($scope, ItemsService, CategoryService) {

        $scope.items = [];
        ItemsService.getItems(function(data) {
          $scope.items = data;
        });

        $scope.categories = [];
        CategoryService.getCategories(function(data) {
          $scope.categories = data;
        });

        $scope.modifySignal = false;

        $scope.modifyCurrentCategory = function (changingCategory) {

          $scope.modifySignal = true;
          ItemsService.set('changingCategory', changingCategory);
        };

        $scope.cancelModify = function () {

          $scope.modifySignal = false;
        };

        $scope.deleteCurrentCategory = function (category) {

          $scope.categorys = CategoryService.deleteCategory(category, $scope.categorys);
          $scope.items = CategoryService.deleteItem(category, $scope.items);
        };

        $scope.changeCurrentCategory = function (category) {

          $scope.categorys = CategoryService.changeCategory(category, $scope.categorys);

          $scope.items = CategoryService.changeItem(category, $scope.items);
        };
    });
