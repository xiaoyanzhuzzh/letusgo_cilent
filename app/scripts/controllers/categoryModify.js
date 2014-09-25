'use strict';

angular.module('letusgoApp')
  .controller('CategoryModifyCtrl', function ($scope, ItemsService, CategoryService) {

    $scope.$emit('to-parent-categoryManagementActive');

    $scope.items = [];
    ItemsService.getItems(function(data) {
      $scope.items = data;
    });

    $scope.categories = [];
    CategoryService.getCategories(function(data) {
      $scope.categories = data;
    });

    $scope.modifySignal = false;

    $scope.modifyButton = function (changingCategory) {

      $scope.modifySignal = true;
      $scope.categoryInfo = {
        id: changingCategory.id,
        name: changingCategory.name
      };
    };

    $scope.cancelModify = function () {

      $scope.modifySignal = false;
    };

    $scope.deleteCurrentCategory = function (category) {

      CategoryService.deleteCategory(category.id);
      CategoryService.getCategories(function(data) {
        $scope.categories = data;
      });
    };

    $scope.modifyCurrentCategory = function (newCategory) {

      CategoryService.putCategory(newCategory);
      CategoryService.getCategories(function(data) {
        $scope.categories = data;
      });
    };
  });
