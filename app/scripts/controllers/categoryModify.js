'use strict';

angular.module('letusgoApp')
    .controller('CategoryModifyCtrl', function ($scope, categoryService) {

        $scope.items = Util.localStorage.getStorageItem('items');

        $scope.categorys = Util.localStorage.getStorageItem('categorys');

        $scope.modifySignal = false;

        $scope.modifyCurrentCategory = function (changingCategory) {

          $scope.modifySignal = true;
          Util.localStorage.setStorageItem('changingCategory', changingCategory);
        };

        $scope.cancelModify = function () {

          $scope.modifySignal = false;
        };

        $scope.deleteCurrentCategory = function (category) {

          $scope.categorys = categoryService.deleteCategory(category, $scope.categorys);
          $scope.items = categoryService.deleteItem(category, $scope.items);
        };

        $scope.changeCurrentCategory = function (category) {

          $scope.categorys = categoryService.changeCategory(category, $scope.categorys);

          $scope.items = categoryService.changeItem(category, $scope.items);
        };


    });
