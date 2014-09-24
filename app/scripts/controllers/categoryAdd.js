'use strict';


angular.module('letusgoApp')
  .controller('CategoryAddCtrl', function ($scope, ItemsService, CategoryService) {

    $scope.items = [];
    ItemsService.getItems(function(data) {
      $scope.items = data;
    });

    $scope.categories = [];
    CategoryService.getCategories(function(data) {
      $scope.categories = data;
    });

    $scope.showSignal = false;

    $scope.addButton = function () {

        $scope.showSignal = true;

    };
    $scope.cancelButton = function () {

      $scope.showSignal = false;
    };

    $scope.deleteCurrentCategory = function (category) {

      CategoryService.deleteCategory(category.id);
      CategoryService.getCategories(function(data) {
        $scope.categories = data;
      });
    };

    $scope.addNewCategory = function (newCategory) {

      newCategory.id = $scope.categories[$scope.categories.length - 1].id + 1;

      CategoryService.addCategory(newCategory);
      CategoryService.getCategories(function(data) {
        $scope.categories = data;
      });
        $scope.showSignal = false;
    };
  });
