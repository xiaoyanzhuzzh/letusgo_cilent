'use strict';


angular.module('myYoApp')
  .controller('ItemModifyCtrl', function ($scope, categoryService, itemManagementService) {

    $scope.items = Util.localStorage.getStorageItem('items');

    //$scope.categorys = categoryService.getCategorysAndId($scope.items);
    $scope.categorys = Util.localStorage.getStorageItem('categorys');

    $scope.showItemSignal = false;

    $scope.modifyButton = function (changingItem) {

      $scope.showItemSignal = true;
      Util.localStorage.setStorageItem('changingItem', changingItem);
    };

    $scope.cancelButton = function () {

      $scope.showItemSignal = false;
    };

    $scope.deleteCurrentItem = function (item) {

      $scope.items = itemManagementService.deleteItem($scope.items, item);
    };

    $scope.modifyCurrentItem = function (newItem) {

      $scope.items = itemManagementService.modifyItem(newItem, $scope.items);
    };

  });
